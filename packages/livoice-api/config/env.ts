import dotenv from 'dotenv';
dotenv.config();

import { cleanEnv, str, url } from 'envalid';

const DEFAULT_PORT = 3000;
const DEFAULT_APP_URL = 'http://localhost:3000';
const DEFAULT_BASE_URL = `http://localhost:${DEFAULT_PORT}`;
const DEFAULT_ALLOWED_ORIGINS = [DEFAULT_APP_URL, DEFAULT_BASE_URL].join(',');

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production'], default: 'development' }),
  DATABASE_URL: url(),
  /**
   * The secret used to encrypt session data and magic links using @hapi/iron.
   * Please use a 32-char or more password.
   */
  SESSION_SECRET: str(),
  APP_URL: url({ default: DEFAULT_APP_URL }),
  BASE_URL: url({ default: DEFAULT_BASE_URL }),
  NEXTAUTH_URL: url(), // must be set in .env - the npm package reads from there
  ALLOWED_ORIGINS: str({ default: DEFAULT_ALLOWED_ORIGINS }),

  COOKIE_DOMAIN: str({ default: 'localhost' }),

  DATABASE_PROVIDER: str({ choices: ['sqlite', 'postgresql', 'mysql'], default: 'sqlite' }),

  OPENAI_API_KEY: str(),
  OPENAI_MODEL: str({ default: 'gpt-4o-mini' }),
  OPENAI_EMBEDDING_MODEL: str({ default: 'text-embedding-3-small' }),
  REDIS_HOST: str({ default: 'localhost' }),
  REDIS_PORT: str({ default: '6379' }),
  REDIS_PASSWORD: str({ default: '' }),
  REDIS_TLS: str({ default: 'false' }),

  GOOGLE_CLIENT_ID: str(),
  GOOGLE_CLIENT_SECRET: str(),

  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str(),
  CLOUDINARY_API_FOLDER: str()
});

export default env;
