import { fileURLToPath, URL } from 'node:url';
import { createRequire } from 'node:module';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const require = createRequire(import.meta.url);
const path = require('path');
const defaultSettings = require('./src/settings.js');

// Resolve function to get absolute path
function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = defaultSettings.title || 'ProjectFlow'; // page title
const port = process.env.port || process.env.npm_config_port || 5002; // dev port

console.log('Vite config is loading...');
console.log('Project Name:', name);
console.log('Development Port:', port);

export default defineConfig({
  base: '/', // Equivalent to publicPath
  build: {
    outDir: 'dist', // Default output directory for production builds
    assetsDir: 'static',
    sourcemap: false,
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },    
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  server: {
    host: true,
    port: port,
    open: true,
    overlay: true, // Equivalent to client.overlay
    proxy: {}, // You can specify proxy configurations here if needed
  },
  plugins: [
    vue()
  ],
  optimizeDeps: {
    include: ['vue', 'vue-router', 'element-plus'], // Add your frequently used dependencies here
    // To disable auto-optimization, comment out the line below:
    auto: false,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  esbuild: {
    logLevel: 'info',
  }
});

console.log('Vite config loaded.');
