import { drive_v3, google } from 'googleapis';
import env from '../config/env';

const GOOGLE_DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.readonly';

const toGoogleCredentials = () => {
  try {
    return JSON.parse(env.GOOGLE_SERVICE_ACCOUNT_KEY);
  } catch (error) {
    throw new Error(
      `Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY as JSON: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

const auth = new google.auth.GoogleAuth({
  credentials: toGoogleCredentials(),
  scopes: [GOOGLE_DRIVE_SCOPE]
});

let driveClient: drive_v3.Drive | null = null;

export const getGoogleDriveClient = () => {
  if (driveClient) return driveClient;

  driveClient = google.drive({
    version: 'v3',
    auth
  });

  return driveClient;
};

export const getGoogleDriveAccessToken = async () => {
  const token = await auth.getAccessToken();
  if (!token) throw new Error('Failed to get Google Drive access token');
  return token;
};
