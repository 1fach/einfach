import { customMergeProps } from "./utils/prime-merge-props";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    rootId: "einfach",
  },
  typescript: {
    typeCheck: true,
    strict: true,
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-primevue", "nuxt-icon"],
  primevue: {
    options: {
      unstyled: true,
      ptOptions: {
        mergeProps: customMergeProps,
      },
    },
    importPT: {
      as: "Wind",
      from: "ui/presets/wind",
    },
  },
  css: ["ui/globals.css"],
});
