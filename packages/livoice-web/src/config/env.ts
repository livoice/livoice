import { cleanEnv, str, url } from 'envalid';

const DEFAULT_PORT = 5173;

const env = cleanEnv(import.meta.env, {
  VITE_BASE_API: url({ default: 'http://localhost:3000' }),
  VITE_BASE_API_PATH: str({ default: '' }),
  VITE_BASE_APP: url({ default: `http://localhost:${DEFAULT_PORT}` })
});

console.log('env', env.VITE_BASE_API_PATH);

export default env;
