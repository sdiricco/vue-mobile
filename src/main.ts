import { createApp } from 'vue'
import App from './App.vue'
/**
 * Pinia
 */
import {createPinia} from 'pinia'
/**
 * Router
 */
import router from './router';
/**
 * Primevue
 */
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
/**
 * Ionic
 */
import { IonicVue } from '@ionic/vue';
import '@ionic/vue/css/core.css'
/**
 * Css
 */
import './style.css'



const app = createApp(App)
app.use(router);
app.use(createPinia())
app.use(IonicVue)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: false
        }
    }
})

router.isReady().then(() => {
    app.mount('#app');
  });

