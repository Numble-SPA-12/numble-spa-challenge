import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: [
      { find: '@components', replacement: '/src/components' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@common', replacement: '/src/common' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@api', replacement: '/src/api' },
      { find: '@', replacement: '/src' },
    ],
  },
});
