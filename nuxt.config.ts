// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@vueuse/motion/nuxt'],
    css: [
        '@fortawesome/fontawesome-svg-core/styles.css'
    ],
    app: {
        head: {
            bodyAttrs: {
                style: "background-image: linear-gradient(106.83deg, \
                    rgb(82, 0, 255) -1.36%, \
                    rgb(159, 0, 151) 36.23%, \
                    rgb(188, 0, 87) 64.28%, \
                    rgb(255, 0, 0) 106.35%); background-color: initial; margin: 0;"
            }
        }
    }  
})
