import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: [
      { find: '@components', replacement: '/src/components' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@', replacement: '/src' },
    ],
  },
});
