import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    expect: {
      poll: {
        interval: 5
      }
    },
    browser: {
      screenshotFailures: false
    },
    testTimeout: 2000,
    hookTimeout: 2000
  }
});
