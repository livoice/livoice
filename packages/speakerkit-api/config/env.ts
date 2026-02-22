import dotenv from 'dotenv';
import path from 'path';

// Load .env from monorepo root
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

import { cleanEnv, num, str, url } from 'envalid';

const DEFAULT_PORT = 3002;
const DEFAULT_LIVOICE_API_URL = 'http://localhost:3000';

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production'], default: 'development' }),
  SPEAKERKIT_PORT: num({ default: DEFAULT_PORT }),
  SPEAKERKIT_DATABASE_URL: url(),
  SESSION_SECRET: str(),
  LIVOICE_API_URL: url({ default: DEFAULT_LIVOICE_API_URL })
});

export default env;
