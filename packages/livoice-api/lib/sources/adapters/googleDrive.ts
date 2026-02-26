import { getAudioUrl, copyVideoFromUrl, isAudioReady, isReady, requestAudioDownload } from '../../cloudflareStream';
import { toSrt, transcribeFromUrl } from '../../deepgram';
import { getGoogleDriveAccessToken, getGoogleDriveClient } from '../../googleDriveAuth';
import { SourceAdapter, SourceItem } from '../types';

const toDriveFileUrl = (fileId: string) => `https://drive.google.com/file/d/${fileId}/view`;
const toDriveMediaUrl = (fileId: string, token: string) =>
  `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&access_token=${token}`;

const parseFolderIdFromUrl = (url: string | undefined | null) => {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);
    const folderMatch = parsedUrl.pathname.match(/\/folders\/([^/]+)/);
    if (folderMatch?.[1]) return folderMatch[1];
    return parsedUrl.searchParams.get('id');
  } catch {
    return null;
  }
};

const toDurationSeconds = (durationMillis?: string | null) => {
  if (!durationMillis) return null;
  const durationMs = Number(durationMillis);
  if (!durationMs || Number.isNaN(durationMs)) return null;
  return Math.floor(durationMs / 1000);
};

export const googleDriveAdapter: SourceAdapter = {
  parseSourceUrl: parseFolderIdFromUrl,
  listItems: async folderExternalId => {
    const drive = getGoogleDriveClient();
    const { data } = await drive.files.list({
      q: `'${folderExternalId}' in parents and mimeType contains 'video/' and trashed = false`,
      fields: 'files(id,name,createdTime,thumbnailLink,videoMediaMetadata(durationMillis))',
      orderBy: 'createdTime desc',
      pageSize: 1000
    });

    return (data.files ?? [])
      .filter(({ id }) => Boolean(id))
      .map(
        file =>
          ({
            externalId: file.id as string,
            title: file.name ?? '',
            url: toDriveFileUrl(file.id as string),
            publishedAt: file.createdTime ? new Date(file.createdTime) : null,
            duration: toDurationSeconds(file.videoMediaMetadata?.durationMillis),
            thumbnailUrl: file.thumbnailLink ?? null,
            description: null,
            chapters: null,
            tags: [],
            category: null
          }) as SourceItem
      );
  },
  fetchInfo: async fileExternalId => {
    const drive = getGoogleDriveClient();
    const { data } = await drive.files.get({
      fileId: fileExternalId,
      fields: 'id,name,description,createdTime,thumbnailLink,videoMediaMetadata(durationMillis)'
    });

    return {
      description: data.description ?? null,
      publishedAt: data.createdTime ? new Date(data.createdTime) : null,
      thumbnailUrl: data.thumbnailLink ?? null,
      duration: toDurationSeconds(data.videoMediaMetadata?.durationMillis)
    };
  },
  startIngest: async fileExternalId => {
    const token = await getGoogleDriveAccessToken();
    const mediaUrl = toDriveMediaUrl(fileExternalId, token);
    const streamId = await copyVideoFromUrl(mediaUrl, { source: 'google_drive', fileId: fileExternalId });
    return { streamId };
  },
  checkIngest: async streamId => isReady(streamId),
  startPrepare: async streamId => requestAudioDownload(streamId),
  checkPrepare: async streamId => isAudioReady(streamId),
  fetchTranscript: async (_itemExternalId, streamId) => {
    if (!streamId) throw new Error('Missing streamId for google_drive transcript fetch');
    const audioUrl = await getAudioUrl(streamId);
    const transcription = await transcribeFromUrl(audioUrl, 'he');
    return toSrt(transcription);
  }
};
