import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { codecovVitePlugin } from '@codecov/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Codecov bundle analysis — inert unless CODECOV_TOKEN is set (CI only).
    codecovVitePlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: '@minesweeper/web',
      uploadToken: process.env.CODECOV_TOKEN,
    }),
  ],
  build: {
    outDir: './build',
    emptyOutDir: true,
  },
})
