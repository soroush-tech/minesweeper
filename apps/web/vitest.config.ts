import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setup/tests/vitest-setup.ts'],
  },
  resolve: {
    alias: {
      // Ensure your alias resolves to the correct module path
      msw: path.resolve(__dirname, 'node_modules/msw'),
    },
  },
})
