import react from '@vitejs/plugin-react';
import { defineConfig, type PluginOption } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(async ({ mode }) => {
  const tailwindcss = (await import('@tailwindcss/vite')).default;
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
    ],
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    define: {
      process: process
    },
    esbuild: {
      target: 'esnext'
    }
  };
});
