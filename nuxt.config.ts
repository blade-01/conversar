// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "%s | Conversar",
      title: "Conversar",
      meta: [
        { charset: "utf-8" },
        {
          name: "description",
          content:
            "Boost your productivity with Conversar - work smarter, not harder."
        },
        { name: "theme-color", content: "#1e1e2e" }
      ],
      link: [{ rel: "icon", href: "/favicon.ico" }]
    }
  },
  devtools: { enabled: true },
  css: [
    "primevue/resources/themes/tailwind-light/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css"
  ],
  plugins: [
    "~/plugins/directives.client.ts",
    "~/plugins/vue-tel-input.ts",
    "~/plugins/primevue.ts"
    // "~/plugins/firebase.ts"
  ],
  build: {
    transpile: ["primevue"]
  },
  imports: {
    dirs: ["store"]
  },
  /**
   * Environment variables
   */
  runtimeConfig: {
    public: {
      firebase: {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID
      }
    }
  },
  /**
   * Modules configuration
   */
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@vueuse/nuxt",
    "nuxt-icon",
    "nuxt-headlessui",
    "@tailvue/nuxt",
    "@vee-validate/nuxt",
    "dayjs-nuxt",
    "vue3-carousel-nuxt",
    "@nuxt/devtools",
    "@nuxtjs/color-mode",
    "nuxt-vuefire"
  ],
  /**
   * Pinia configuration
   */
  pinia: {
    storesDirs: ["./store/**"]
    // autoImports: ["defineStore", "acceptHMRUpdate"]
  },
  /**
   * VeeValidate Configuration
   */
  veeValidate: {
    autoImports: true
  },
  /**
   * Carousel Configuration
   */
  carousel: {
    prefix: "Nuxt"
  },
  /**
   * Dayjs Configuration
   */
  dayjs: {
    locales: ["en", "fr"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "en",
    defaultTimezone: "America/New_York"
  },
  /**
   * Nuxt Color Mode Configuration
   */
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light"
  },
  /**
   * External Image Provider Configuration
   */
  image: {
    cloudinary: {
      baseURL: "https://res.cloudinary.com/bladencove/image/upload/RC"
    }
  },
  /**
   * Vuefire configuration
   */
  vuefire: {
    config: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID
    },
    auth: {
      enabled: true
    }
  }
});
