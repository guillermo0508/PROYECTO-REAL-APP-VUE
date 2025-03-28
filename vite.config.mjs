import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  server: {
    port: 3000
  },
  preview: {
    host: true,
    port: 3000,
    allowedHosts: [
      'proyecto-real-apis-1.onrender.com',
      'proyecto-real-app-vue.onrender.com' // Agregado aquí
    ]
  },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})