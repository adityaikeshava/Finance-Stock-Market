import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 5174,
    strictPort: true,
    cors: true, // Enable CORS for Vite's dev server
    watch: {
      usePolling: true,
      interval: 1000 // More responsive file watching
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5174,
      clientPort: 5174 // Ensures consistent port for HMR
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            // Add CORS headers to proxied requests
            proxyReq.setHeader('Access-Control-Allow-Origin', 'http://localhost:5174');
            proxyReq.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            proxyReq.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          });
          proxy.on('error', (err) => {
            console.error('Proxy error:', err);
          });
        }
      }
    }
  },
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom'] // Optimize these dependencies
  }
});