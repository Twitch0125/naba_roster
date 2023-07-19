// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@unocss/nuxt", "@vueuse/nuxt", "nuxt-og-image", "nuxt-headlessui"],
  css: ["@unocss/reset/tailwind.css"],
});
