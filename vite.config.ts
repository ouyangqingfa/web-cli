import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    resolve(),
    commonjs(),
  ],
  resolve: {
    alias: {
      "@": "/src"
    }
  },
  // build: {
  //   target: 'es2015',
  //   outDir: 'dist',
  //   terserOptions: {
  //     compress: {
  //       keep_infinity: true,
  //       drop_console: true,
  //     },
  //   },
  //   brotliSize: false,
  //   chunkSizeWarningLimit: 2000,
  //   sourcemap: true
  // },
  server: {
    host: "0.0.0.0",
    port: 8082,
    proxy: {
      '/api': {
        target: "http://192.168.4.223:18777",
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, '')
      },
      '/gmap': {
        target: "http://192.168.4.223:8089",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/gmap/, '')
      },
      '/geoserver': {
        target: "http://192.168.4.223:8080",
        changeOrigin: true,
      }
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: [],
        javascriptEnabled: true,
      },
    },
  },
})
