import { defineConfig } from '@playwright/test';

const baseURL = process.env['BASE_URL'] || 'http://localhost:4200';

export default defineConfig({
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
});
