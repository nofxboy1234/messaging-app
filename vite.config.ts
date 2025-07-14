// vite.config.ts
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
  build: {
    rollupOptions: {
      input: {
        // Keep your JS entrypoints separate
        application: './app/frontend/entrypoints/application.js',
        inertia: './app/frontend/entrypoints/inertia.js',
        // Make index.css its own, distinct entrypoint
        // Use a unique name like 'global_styles_css' to avoid any naming conflicts
        global_styles_css: './app/frontend/index.css',
      },
    },
    // Ensure CSS is extracted and not inlined
    cssCodeSplit: true, // This is default, but good to be explicit
    assetsInlineLimit: 0, // Ensure even small CSS files are NOT inlined into JS
  },
});
