import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    buildModules: [
        'nuxt-windicss', // nuxt用の設定追加
    ],
    windicss: {
        scan: {
            dirs: ['./'],
            exclude: [
                'node_modules',
                'dist',
            ],
        },
    },
})
