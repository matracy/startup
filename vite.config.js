import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    istanbul({
      include: ['src/**/*'],
      exclude: ['node_modules'],
      requireEnv: false,
    }),
  ],
});
