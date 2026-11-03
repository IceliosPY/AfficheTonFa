import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: { include: ['tests/**/*.spec.ts'], environment: 'node', coverage: { reporter: ['text', 'html'] } },
  resolve: {
    alias: {
      '@affichetonfa/shared-types': new URL('./packages/shared-types/src/index.ts', import.meta.url).pathname,
      '@affichetonfa/board-core': new URL('./packages/board-core/src/index.ts', import.meta.url).pathname,
    },
  },
});
