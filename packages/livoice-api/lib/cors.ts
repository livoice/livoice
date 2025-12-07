import type { CorsOptions } from 'cors';
import env from '../config/env';

export default {
  credentials: true,
  origin(origin, callback) {
    const allowed = [...env.ALLOWED_ORIGINS.split(','), env.APP_URL, env.BASE_URL].filter(
      Boolean
    );
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  }
} satisfies CorsOptions;
