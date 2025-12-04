import dotenv from 'dotenv';
import { CleanedEnv, cleanEnv, num, str, url } from 'envalid';

dotenv.config();

const envSpec = {
  PORT: num({ default: 3000 }),
  DATABASE_URL: url(),
  OPENAI_API_KEY: str()
} as const;

export type Env = CleanedEnv<typeof envSpec>;

export const env = cleanEnv(process.env, envSpec);
