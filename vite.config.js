import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { isPrivilegedSupabaseKey } from './src/lib/supabaseConfig.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  if (isPrivilegedSupabaseKey((env.VITE_SUPABASE_ANON_KEY || '').trim())) {
    throw new Error('VITE_SUPABASE_ANON_KEY berisi kunci server. Gunakan publishable key atau anon key agar kunci server tidak masuk bundle browser.')
  }
  return {
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Bio Smart - Belajar Biologi',
        short_name: 'Bio Smart',
        description: 'Aplikasi pembelajaran biologi SMA yang interaktif dan ringan.',
        theme_color: '#0d5c46',
        background_color: '#fcfdfc',
        start_url: './',
        scope: './',
        display: 'standalone',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}']
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  base: './',
  }
})
