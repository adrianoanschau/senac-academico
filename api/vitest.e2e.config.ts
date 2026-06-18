import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    root: './',
    include: ['test/**/*.e2e-spec.ts'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    fileParallelism: false,
  },
  resolve: {
    alias: {
      '@/prisma/generated': path.resolve(__dirname, './prisma/generated'),
      '@/auth': path.resolve(__dirname, './src/auth'),
      '@/prisma': path.resolve(__dirname, './src/prisma'),
    },
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
