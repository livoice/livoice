import { cleanEnv, url } from 'envalid';

const env = cleanEnv(import.meta.env, {
  VITE_API_URL: url({ default: 'http://localhost:3000/api' }),
  VITE_APP_URL: url({ default: 'http://localhost:5173' })
});

export default env;
