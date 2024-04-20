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
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    'nuxt-icon',
    'shadcn-nuxt',
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
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },
})
