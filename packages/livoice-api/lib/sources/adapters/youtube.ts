import youtubeDlExec from 'youtube-dl-exec';
import { Innertube, Log, YTNodes } from 'youtubei.js';
import { TempFile } from '../../TempFile';
import { SourceAdapter, SourceItem } from '../types';
import { proxyFetch } from './utils/fetchWithProxy';

Log.setLevel(Log.Level.INFO);

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

const secondsFromDuration = (duration?: number | string | null) => {
  if (!duration) return null;
  if (typeof duration === 'number') return duration;
  const parsed = Number.parseInt(duration, 10);
  return Number.isNaN(parsed) ? null : parsed;
};

type YoutubeClient = Awaited<ReturnType<typeof Innertube.create>>;
type YoutubeChannel = Awaited<ReturnType<YoutubeClient['getChannel']>>;
type YoutubeVideosTab = Awaited<ReturnType<YoutubeChannel['getVideos']>>;
type YoutubeVideoArray = YoutubeVideosTab['videos'];

const cloneVideos = (videos?: YoutubeVideoArray): YoutubeVideoArray => {
  if (videos) return videos.slice() as YoutubeVideoArray;
  return [] as unknown as YoutubeVideoArray;
};

const isYoutubeVideo = (node: unknown): node is YTNodes.Video =>
  node instanceof YTNodes.Video || (node as { id?: unknown })?.id !== undefined;

const parsePublished = (published?: { text?: string }) => {
  const text = published?.text;
  if (!text) return null;
  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

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

const toVideoUrl = (videoId: string) => `https://www.youtube.com/watch?v=${videoId}`;

const youtubeClient = Innertube.create({ fetch: proxyFetch });

export const youtubeAdapter: SourceAdapter = {
  parseSourceUrl: (url: string | undefined | null) => extractChannelId(url ?? ''),

  listItems: async sourceExternalId => {
    const client = await youtubeClient;
    console.log(`[youtubeAdapter] listItems: sourceExternalId=${sourceExternalId}`);
    const channelId = await toChannelId(client, sourceExternalId);
    console.log(`[youtubeAdapter] listItems: channelId=${channelId}`);
    const channel = await client.getChannel(channelId);
    const videosTab = await channel.getVideos();

    const allVideos = await gatherVideos(videosTab);

    console.log(`[youtubeAdapter] listItems: fetched ${allVideos.length} videos`);
    return allVideos.filter(isYoutubeVideo).map(
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

  fetchSubtitles: async itemExternalId => {
    const LANG = 'en';
    const SUB_FORMAT = 'srt';

    console.log('[youtubeAdapter] fetchSubtitles: itemExternalId=', itemExternalId);

    const tempFile = await TempFile.create();

    await youtubeDlExec(toVideoUrl(itemExternalId), {
      skipDownload: true,
      writeAutoSub: true,
      subLang: LANG,
      subFormat: SUB_FORMAT,
      output: tempFile.path
    });

    const strContent = await tempFile.content(`.${LANG}.${SUB_FORMAT}`);
    console.log(`[youtubeAdapter] fetchSubtitles: downloaded content length=${strContent.length}`);

    return strContent;
  }
};
