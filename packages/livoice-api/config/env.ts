import dotenv from 'dotenv';
import path from 'path';

// Load .env from monorepo root
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

import { cleanEnv, num, str, url } from 'envalid';

const DEFAULT_PORT = 3000;
const DEFAULT_BASE_API = `http://localhost:${DEFAULT_PORT}`;

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production'], default: 'development' }),

  // API
  PORT_API: num({ default: DEFAULT_PORT }),
  DATABASE_URL: url(),
  DATABASE_PROVIDER: str({ choices: ['sqlite', 'postgresql', 'mysql'], default: 'sqlite' }),
  SESSION_SECRET: str(),
  APP_URL: url({ default: DEFAULT_BASE_API }),
  NEXTAUTH_URL: url(), // must be set in .env - the npm package reads from there
  COOKIE_DOMAIN: str({ default: 'localhost' }),
  ALLOWED_ORIGINS: str(),

  // OpenAI
  OPENAI_API_KEY: str(),
  OPENAI_MODEL: str({ default: 'gpt-4o-mini' }),
  OPENAI_EMBEDDING_MODEL: str({ default: 'text-embedding-3-small' }),

  // Redis
  REDIS_HOST: str({ default: 'localhost' }),
  REDIS_PORT: num({ default: 6379 }),
  REDIS_PASSWORD: str({ default: '' }),
  REDIS_TLS: str({ choices: ['true', 'false'], default: 'false' }),

  // Google Cloud
  GOOGLE_CLIENT_ID: str(),
  GOOGLE_CLIENT_SECRET: str(),

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str(),
  CLOUDINARY_API_FOLDER: str(),

  // YouTube
  YOUTUBE_COOKIES_FILE: str({ default: '' }),

  // Web
  VITE_BASE_API: url({ default: DEFAULT_BASE_API }),
  VITE_BASE_API_PATH: str({ default: '' }),
  VITE_BASE_APP: url({ default: DEFAULT_BASE_API })
});

const { VITE_BASE_APP, VITE_BASE_API, ...restEnv } = env;

const BASE_APP = VITE_BASE_APP;
const BASE_API = VITE_BASE_API ?? `http://localhost:${env.PORT_API}`;

export default {
  ...restEnv,
  BASE_APP,
  BASE_API,
  ALLOWED_ORIGINS: [...env.ALLOWED_ORIGINS.split(','), BASE_APP, BASE_API]
};
