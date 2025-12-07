import { ChatExtension } from './Chat';
import { TranscriptIngestion } from './TranscriptIngestion';

export const SCHEMA_EXTENSIONS = [TranscriptIngestion, ChatExtension];

export { ChatExtension, TranscriptIngestion };
