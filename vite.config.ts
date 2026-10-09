import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: [
      '3000-is7z5fr7w02k9rlmmecla-b8b91ab3.sg2.manus.computer',
      '8328-is7z5fr7w02k9rlmmecla-b8b91ab3.sg2.manus.computer',
    ],
  },
});
