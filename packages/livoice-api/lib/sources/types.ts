export type SourceType = 'youtube_channel' | 'podcast_feed' | 'vimeo_channel';

export type SourceItem = {
  externalId: string;
  title: string;
  url: string;
  publishedAt: Date | null;
  duration: number | null;
  thumbnailUrl: string | null;
};

export type SourceAdapter = {
  listItems: (sourceExternalId: string) => Promise<SourceItem[]>;
  fetchTranscript: (itemExternalId: string) => Promise<string>;
  parseSourceUrl: (url: string | undefined | null) => string | null;
};
