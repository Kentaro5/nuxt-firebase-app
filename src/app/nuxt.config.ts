import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  buildModules: [
    'nuxt-windicss', // nuxt用の設定追加
  ],
  ssr: false,
  typescript: {
    strict: true
  },
  runtimeConfig: {
    public: {
      FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY, // variable that can also be accessed on the client side
      FIREBASE_AUTH_DOMAIN: process.env.VITE_FIREBASE_AUTH_DOMAIN, // variable that can also be accessed on the client side
      FIREBASE_PROJECT_ID: process.env.VITE_FIREBASE_PROJECT_ID, // variable that can also be accessed on the client side
      FIREBASE_STORAGE_BUCKET: process.env.VITE_FIREBASE_STORAGE_BUCKET, // variable that can also be accessed on the client side
      FIREBASE_MESSAGING_SENDER_ID: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID, // variable that can also be accessed on the client side
      FIREBASE_APP_ID: process.env.VITE_FIREBASE_APP_ID, // variable that can also be accessed on the client side
    }
  },
})
