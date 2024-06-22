// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    rootId: 'einfach',
  },
  typescript: {
    typeCheck: true,
    strict: true,
  },
  devtools: { enabled: true },
  telemetry: false,
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    'nuxt-icon',
    'shadcn-nuxt',
    '@vite-pwa/nuxt',
  ],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  colorMode: {
    classSuffix: '',
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
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
})
