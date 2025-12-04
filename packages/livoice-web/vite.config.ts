import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type PluginOption } from 'vite';
// import { visualizer } from 'rollup-plugin-visualizer';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const devPlugins: PluginOption[] = [];

  if (mode !== 'production') {
    try {
      const { i18nextHMRPlugin } = await import('i18next-hmr/vite');
      devPlugins.push(i18nextHMRPlugin({ localesDir: './public/locales' }));
    } catch (error) {
      console.error('Failed to load development plugins:', error);
    }
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      svgr({
        svgrOptions: {
          icon: true
        }
      }),
      ...devPlugins
      // visualizer({
      //   open: true,
      //   gzipSize: true,
      //   brotliSize: true
      // })
    ],
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    define: {
      process: process
    },
    server: {
      proxy: {
        [`${env.VITE_BASE_API_PATH}/auth`]: {
          target: env.VITE_BASE_API,
          changeOrigin: true,
          secure: env.NODE_ENV === 'production'
        },
        [`${env.VITE_BASE_API_PATH}/files/upload`]: {
          target: env.VITE_BASE_API,
          changeOrigin: true,
          secure: env.NODE_ENV === 'production'
        }
      }
    }
  };
});
