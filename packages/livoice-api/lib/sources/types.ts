export type SourceType = 'youtube_channel' | 'podcast_feed' | 'vimeo_channel' | 'google_drive';

export type SourceItem = {
  externalId: string;
  title: string;
  url: string;
  publishedAt: Date | null;
  duration: number | null;
  thumbnailUrl: string | null;
  description: string | null;
  chapters: Array<{ title: string; startMs: number; endMs: number }> | null;
  tags: string[] | null;
  category: string | null;
};

export type SourceAdapter = {
  listItems: (sourceExternalId: string) => Promise<SourceItem[]>;
  fetchTranscript: (itemExternalId: string, streamId?: string) => Promise<string>;
  parseSourceUrl: (url: string | undefined | null) => string | null;
  fetchInfo?: (itemExternalId: string) => Promise<Partial<SourceItem>>;
  startIngest?: (itemExternalId: string) => Promise<{ streamId: string } | null>;
  checkIngest?: (streamId: string) => Promise<boolean>;
  startPrepare?: (streamId: string) => Promise<void>;
  checkPrepare?: (streamId: string) => Promise<boolean>;
};
