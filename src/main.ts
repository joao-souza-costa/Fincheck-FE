import './index.css'
import 'swiper/css';
import 'vue-toastification/dist/index.css'
import '@vuepic/vue-datepicker/dist/main.css'

import Toast from 'vue-toastification'
import { createApp } from 'vue/dist/vue.esm-bundler'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from "@tanstack/vue-query";

import { setLocale } from 'yup';

setLocale({
  mixed: {
    required: "Este campo é obrigatório"
  },
});

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      }
    },
  },
})

app.use(Toast)
app.mount('#app')
