// import dotenv from "dotenv";
// dotenv.config();
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  server: {
    port: 3000
  },
  define: {
    'process.env.VITE_SERVER_DOMAIN': `"${process.env.VITE_SERVER_DOMAIN}"`,
    'process.env.VITE_CLIENT_DOMAIN': `"${process.env.VITE_CLIENT_DOMAIN}"`
  },
  esbuild: {
    jsxInject: `import React from 'react'`
  },
  plugins: [reactRefresh()]
});
