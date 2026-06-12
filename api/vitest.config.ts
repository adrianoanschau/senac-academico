import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    root: './',
    include: ['**/*.spec.ts'],
    exclude: [
      '**/prisma/generated/**',
      '**/__tests__/**',
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/coverage/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress}.config.*',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['prisma/generated/**'],
    },
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
