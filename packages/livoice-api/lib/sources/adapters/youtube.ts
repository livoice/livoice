import path from 'path';
import youtubeDlExec from 'youtube-dl-exec';
import { TempFile } from '../../TempFile';
import { SourceAdapter, SourceItem } from '../types';
import { proxyFetch } from './utils/proxyFetch';
import { secondsFromDuration } from './utils/secondsFromDuration';

type YoutubeModule = typeof import('youtubei.js');
type YoutubeClient = Awaited<ReturnType<YoutubeModule['Innertube']['create']>>;

const getYoutubeClient = (() => {
  let clientPromise: Promise<YoutubeClient> | null = null;
  return async () => {
    if (!clientPromise) {
      clientPromise = (async () => {
        const { Innertube, Log } = await import('youtubei.js');
        Log.setLevel(Log.Level.WARNING);
        return Innertube.create({ fetch: proxyFetch });
      })();
    }
    return clientPromise;
  };
})();

const extractChannelId = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname;
    if (path.startsWith('/channel/')) return path.split('/')[2] || null;
    if (path.startsWith('/c/')) return path.split('/')[2] || null;
    if (path.startsWith('/@')) return path.slice(2) || null;
    const parts = path.split('/').filter(Boolean);
    return parts[0] ?? null;
  } catch {
    return null;
  }
};

type YoutubeChannel = Awaited<ReturnType<YoutubeClient['getChannel']>>;
type YoutubeVideosTab = Awaited<ReturnType<YoutubeChannel['getVideos']>>;
type YoutubeVideoArray = YoutubeVideosTab['videos'];

type YoutubeVideo = {
  id: string;
  title?: { text?: string };
  published?: { text?: string };
  duration?: { seconds?: string | number | null };
  best_thumbnail?: { url?: string };
};

const cloneVideos = (videos?: YoutubeVideoArray): YoutubeVideoArray => {
  if (videos) return videos.slice() as YoutubeVideoArray;
  return [] as unknown as YoutubeVideoArray;
};

const isYoutubeVideo = (node: unknown): node is YoutubeVideo =>
  typeof node === 'object' && node !== null && typeof (node as { id?: unknown }).id === 'string';

const parsePublished = (published?: { text?: string }) => {
  const text = published?.text;
  if (!text) return null;
  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const toVideoUrl = (videoId: string) => `https://www.youtube.com/watch?v=${videoId}`;

const gatherVideos = async (videosTab: YoutubeVideosTab): Promise<YoutubeVideosTab['videos']> => {
  if (!videosTab?.videos) return [] as unknown as YoutubeVideoArray;
  if (!videosTab.has_continuation) return cloneVideos(videosTab.videos);

  const nextTab = (await (
    videosTab as unknown as { getContinuation: () => Promise<unknown> }
  ).getContinuation()) as YoutubeVideosTab;
  const rest = await gatherVideos(nextTab);
  return [...cloneVideos(videosTab.videos), ...rest] as YoutubeVideoArray;
};

const toChannelId = async (client: YoutubeClient, sourceExternalId: string) => {
  if (sourceExternalId.startsWith('UC')) return sourceExternalId;

  const handle = sourceExternalId.startsWith('@') ? sourceExternalId : `@${sourceExternalId}`;

  try {
    const resolved = await client.resolveURL(`https://www.youtube.com/${handle}`);
    const browseId = (resolved as { payload?: { browseId?: string } })?.payload?.browseId;
    if (browseId) return browseId;
  } catch (error) {
    console.log(`[youtubeAdapter] resolveURL failed for ${handle}:`, error);
  }

  return sourceExternalId;
};

export const youtubeAdapter: SourceAdapter = {
  parseSourceUrl: (url: string | undefined | null) => extractChannelId(url ?? ''),

  listItems: async sourceExternalId => {
    const client = await getYoutubeClient();
    console.log(`[youtubeAdapter] listItems: sourceExternalId=${sourceExternalId}`);
    const channelId = await toChannelId(client, sourceExternalId);
    console.log(`[youtubeAdapter] listItems: channelId=${channelId}`);
    const channel = await client.getChannel(channelId);
    const videosTab = await channel.getVideos();

    const allVideos = await gatherVideos(videosTab);
    const normalized = allVideos.filter(isYoutubeVideo) as YoutubeVideo[];

    console.log(`[youtubeAdapter] listItems: fetched ${normalized.length} videos`);
    return normalized.map(
      (video): SourceItem => ({
        externalId: video.id,
        title: video.title?.text ?? '',
        url: toVideoUrl(video.id),
        publishedAt: parsePublished(video.published),
        duration: secondsFromDuration(video.duration?.seconds ?? null),
        thumbnailUrl: video.best_thumbnail?.url ?? null
      })
    );
  },

  fetchTranscript: async itemExternalId => {
    const LANG = 'en';
    const SUB_FORMAT = 'srt';

    console.log('[youtubeAdapter] fetchTranscript: itemExternalId=', itemExternalId);

    try {
      const tempFile = await TempFile.create();

      await youtubeDlExec(toVideoUrl(itemExternalId), {
        skipDownload: true,
        writeAutoSub: true,
        subLang: LANG,
        subFormat: SUB_FORMAT,
        output: tempFile.path,
        jsRuntimes: 'node' as const,
        cookies: path.resolve(__dirname, 'assets', 'youtube-cookies.txt')
      } as Parameters<typeof youtubeDlExec>[1] & { jsRuntimes?: string });

      const strContent = await tempFile.content(`.${LANG}.${SUB_FORMAT}`);
      console.log(`[youtubeAdapter] fetchTranscript: downloaded content length=${strContent.length}`);

      return strContent;
    } catch (error) {
      console.error(`[youtubeAdapter] fetchTranscript failed for ${itemExternalId}:`, error);
      if (error instanceof Error) {
        console.error(`[youtubeAdapter] Error message: ${error.message}`);
        console.error(`[youtubeAdapter] Error stack: ${error.stack}`);
      }
      throw error;
    }
  }
};
