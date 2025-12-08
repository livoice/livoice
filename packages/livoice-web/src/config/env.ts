import { cleanEnv, str, url } from 'envalid';

const BASE_API: string = import.meta.env.VITE_BASE_API;
const BASE_API_PATH: string = import.meta.env.VITE_BASE_API_PATH;
const BASE_APP: string = import.meta.env.VITE_BASE_APP;
const TRACE_API: string = import.meta.env.VITE_TRACE_API;

const DEFAULT_PORT = 5173;

const env = cleanEnv(import.meta.env, {
  BASE_API: url({ default: 'http://localhost:3000' }),
  BASE_API_PATH: str({ default: '' }),
  BASE_APP: url({ default: `http://localhost:${DEFAULT_PORT}` }),
  TRACE_API: url({ default: 'https://cloudflare.com/cdn-cgi/trace' })
});

export default env;
