import wasm from 'vite-plugin-wasm'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  app: {
    rootId: 'einfach',
  },
  vite: {
    worker: {
      format: 'es',
    },
    plugins: [wasm()],
  },
  typescript: {
    typeCheck: true,
    strict: true,
  },
  devtools: { enabled: true },
  telemetry: false,
  components: [
    {
      path: '~/components',
      extensions: ['.vue'],
    },
  ],
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@vite-pwa/nuxt',
    '@pinia/nuxt',
  ],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  colorMode: {
    classSuffix: '',
  },
  fonts: {
    provider: 'bunny',
  },
  pwa: {
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'icons/apple-touch-icon.png'],
    manifest: {
      name: 'Einfach Budget',
      short_name: 'Einfach',
      description: 'Einfach Budget App',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'icons/pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: 'icons/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icons/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: 'icons/maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
  },
  compatibilityDate: '2024-07-02',
})
