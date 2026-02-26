import { googleDriveAdapter } from './adapters/googleDrive';
import { youtubeAdapter } from './adapters/youtube';
import { SourceAdapter, SourceType } from './types';

export const getSourceAdapter = (type: SourceType): SourceAdapter | undefined => {
  switch (type) {
    case 'youtube_channel':
      return youtubeAdapter;
    case 'google_drive':
      return googleDriveAdapter;
    default:
      console.error(`Unknown source type: ${type}`);
      return undefined;
  }
};
