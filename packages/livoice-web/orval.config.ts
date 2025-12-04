import dotenv from 'dotenv';
import { defineConfig } from 'orval';

dotenv.config();

const apiBase = process.env.VITE_BASE_API;
if (!apiBase) throw new Error('VITE_API_URL is required for code generation');

export default defineConfig({
  livoice: {
    input: `${apiBase}/openapi.json`,
    output: {
      mode: 'single',
      target: 'src/api/generated.ts',
      client: 'react-query',
      override: {
        mutator: {
          path: './src/api/axiosClient.ts',
          name: 'axiosClient'
        }
      },
      prettier: true
    }
  }
});
