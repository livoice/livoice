import { parseDate as parseRelativeDate } from 'chrono-node';
import { startOfDay } from 'date-fns';
import { existsSync } from 'fs';
import path from 'path';
import youtubeDlExec from 'youtube-dl-exec';
import env from '../../../config/env';
import { TempFile } from '../../TempFile';
import { SourceAdapter, SourceItem } from '../types';
import { proxyFetch } from './utils/proxyFetch';
import { secondsFromDuration } from './utils/secondsFromDuration';
import type { YtDlpVideoInfo } from './youtubeTypes';

type YoutubeModule = typeof import('youtubei.js');
type YoutubeClient = Awaited<ReturnType<YoutubeModule['Innertube']['create']>>;

const getYoutubeClient = (() => {
  let clientPromise: Promise<YoutubeClient> | null = null;
  return async () => {
    clientPromise =
      clientPromise ??
      (async () => {
        const { Innertube, Log } = await import('youtubei.js');
        Log.setLevel(Log.Level.WARNING);
        return Innertube.create({ fetch: proxyFetch });
      })();
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

const toVideoUrl = (videoId: string) => `https://www.youtube.com/watch?v=${videoId}`;

const getYtDlpBinaryPath = (): string | undefined => {
  // In production, prefer system-installed yt-dlp or workspace-local binary
  if (env.NODE_ENV !== 'development') {
    const workspaceBinary = path.resolve(process.cwd(), 'yt-dlp');
    if (existsSync(workspaceBinary)) return workspaceBinary;
    if (existsSync('/usr/local/bin/yt-dlp')) return '/usr/local/bin/yt-dlp';
  }
  // Fall back to youtube-dl-exec bundled binary
  return undefined;
};

const customBinaryPath = getYtDlpBinaryPath();

const ytDlpBaseConfig = {
  skipDownload: true,
  cookies: path.resolve(__dirname, 'assets', `youtube-cookies${env.NODE_ENV === 'development' ? '-local' : ''}.txt`),
  ...(customBinaryPath && { binaryPath: customBinaryPath })
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
      (video): SourceItem =>
        ({
          externalId: video.id,
          title: video.title?.text ?? '',
          url: toVideoUrl(video.id),
          publishedAt: (parsed => (parsed ? startOfDay(parsed) : null))(parseRelativeDate(video.published?.text ?? '')),
          duration: secondsFromDuration(video.duration?.seconds ?? null),
          thumbnailUrl: video.best_thumbnail?.url ?? null,
          description: null,
          chapters: null,
          tags: [],
          category: null
        }) as SourceItem
    );
  },

  fetchInfo: async itemExternalId => {
    console.log(`[youtubeAdapter] fetchInfo: itemExternalId=${itemExternalId}`);

    try {
      const info = (await youtubeDlExec(toVideoUrl(itemExternalId), {
        ...ytDlpBaseConfig,
        dumpSingleJson: true,
        noWarnings: true
      })) as YtDlpVideoInfo;

      const description = info.description ?? null;
      const tags = info.tags ?? [];
      const category = info.categories?.[0] ?? null;
      const publishedAt = info.timestamp ? new Date(info.timestamp * 1000) : null;
      const chapters =
        info.chapters?.map(({ title, start_time, end_time }) => ({
          title: title ?? '',
          startMs: Math.floor((start_time || 0) * 1000),
          endMs: Math.floor((end_time || 0) * 1000)
        })) ?? undefined;

      console.log(`[youtubeAdapter] fetchInfo: extracted info for ${itemExternalId}`);
      return { description, category, tags, chapters, publishedAt };
    } catch (error) {
      console.error(`[youtubeAdapter] fetchInfo failed for ${itemExternalId}:`, error);
      return { description: null, category: null, tags: [], chapters: undefined, publishedAt: null };
    }
  },

  fetchTranscript: async itemExternalId => {
    const LANG = 'en';
    const SUB_FORMAT = 'srt';

    console.log('[youtubeAdapter] fetchTranscript: itemExternalId=', itemExternalId);

    try {
      const tempFile = await TempFile.create();

      await youtubeDlExec(toVideoUrl(itemExternalId), {
        ...ytDlpBaseConfig,
        writeAutoSub: true,
        subLang: LANG,
        subFormat: SUB_FORMAT,
        output: tempFile.path,
        jsRuntimes: 'node' as const,
        sleepRequests: Math.random() * 2 + 0.5,
        sleepSubtitles: Math.floor(Math.random() * 5) + 1
      } as Parameters<typeof youtubeDlExec>[1] & {
        jsRuntimes?: string;
        sleepInterval?: number;
        maxSleepInterval?: number;
      });

      const strContent = await tempFile.content(`.${LANG}.${SUB_FORMAT}`);
      console.log(`[youtubeAdapter] fetchTranscript: downloaded content length=${strContent.length}`);

      return strContent;
    } catch (error) {
      // Check if this is an ENOENT error (file not found)
      if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        const errorPath = 'path' in error ? (error as { path?: string }).path : '';
        // If the ENOENT is about the yt-dlp binary, throw - this is a configuration issue
        if (errorPath?.includes('yt-dlp')) {
          console.error(`[youtubeAdapter] fetchTranscript: yt-dlp binary not found at ${errorPath}`, error);
          throw new Error(`yt-dlp binary not found. Ensure yt-dlp is installed on the system.`);
        }
        // Otherwise it's likely a missing subtitle file - expected case
        console.log(`[youtubeAdapter] fetchTranscript: no subtitles available for ${itemExternalId}, skipping`, error);
        return '';
      }

      console.error(`[youtubeAdapter] fetchTranscript failed for ${itemExternalId}:`, error);
      if (error instanceof Error) {
        console.error(`[youtubeAdapter] Error message: ${error.message}`);
        console.error(`[youtubeAdapter] Error stack: ${error.stack}`);
      }
      throw error;
    }
  }
};
