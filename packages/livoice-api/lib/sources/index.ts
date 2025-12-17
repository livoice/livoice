import { youtubeAdapter } from './adapters/youtube';
import { SourceAdapter, SourceType } from './types';

export const getSourceAdapter = (type: SourceType): SourceAdapter | undefined => {
  switch (type) {
    case 'youtube_channel':
      return youtubeAdapter;
    default:
      console.error(`Unknown source type: ${type}`);
      return undefined;
  }
};
