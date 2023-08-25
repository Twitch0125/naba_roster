// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@unocss/nuxt", "@vueuse/nuxt", "nuxt-headlessui", "@anu-vue/nuxt"],
  css: ["@unocss/reset/tailwind.css"],
  anu: {
    themes: {
      light: {
        cssVars: {
          "body-bg-c": "255, 100%, 100%",
        },
        colors: {
          primary: "122.14deg, 26.42%, 20.78%",
        },
      },
    },
  },
});
