import type { CorsOptions } from 'cors';
import env from '../config/env';

export default {
  credentials: true,
  origin(origin, callback) {
    if (!origin || env.ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  }
} satisfies CorsOptions;
