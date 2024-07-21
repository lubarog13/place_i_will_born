// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', "@nuxt/ui"],
  css: [
    // SCSS file in the project
    "~/assets/styles/main.scss",
    "~/assets/styles/variables.scss",
    "vue3-openlayers/styles.css"
  ],
})