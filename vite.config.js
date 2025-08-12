import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['todolist.jpg', 'todolist2.jpg'], // gambar di public/
      manifest: {
        name: 'TodoList App',
        short_name: 'TodoList',
        description: 'A simple todo list PWA',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'todolist.jpg',
            sizes: '192x192',
            type: 'image/jpg'
          },
          {
            src: 'todolist2.jpg',
            sizes: '512x512',
            type: 'image/jpg'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document' ||
              request.destination === 'script' ||
              request.destination === 'style' ||
              request.destination === 'image' ||
              request.destination === 'font',
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 hari
              }
            }
          },
          {
            urlPattern: /^https:\/\/jsonplaceholder\.typicode\.com\/todos/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24
              }
            }
          }
        ]
      }
    })
  ],
})
