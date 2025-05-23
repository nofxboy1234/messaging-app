import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import RubyPlugin from 'vite-plugin-ruby';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-styled-components', { fileName: false }]],
      },
    }),
    RubyPlugin(),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    clearMocks: true,
    exclude: [...configDefaults.exclude, '**/*.spec.?(c|m)[jt]s?(x)'],
    testTimeout: 0,
    fileParallelism: false,
  },
});
