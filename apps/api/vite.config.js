import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    dir: 'src',
    coverage: {
      enabled: true,
      reporter: ['html'],
      include: ['src/**/*.ts'],
    },
    testTimeout: 10000,
  },
})
