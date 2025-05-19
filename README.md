# Project configuration

Questo progetto contiene:
- `vue v3`: Include Pinia
- `primevue v4`: Design kit di componenti utilizzata per la maggior parte dei componenti di UI shared
- `tailwind v4`: CSS framework principale
- `ionic v8`: Design kit di componenti mobile utilizzata per la parte di componenti di layout. Include un plugin custom di routing basato su vue-routing.


# Setup

## Vue, vite

Crea il progetto utilizzando [**Vite**](https://vite.dev/guide/):

```sh
yarn create vite
```

Imposta il progetto per vue e typescript.

## Alias @ setup

Consiglio di impostare `@` come alias per `./src`

Per far ciò installa i `types` di node e modifica i file `vite.config.ts` e `tsconfig.json`

```sh
npm install --save-dev @types/node
```

```js
//vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}

```

## Installa Pinia

Puoi trovare la guida ufficiale su [Pinia.vuejs.org](https://pinia.vuejs.org/getting-started.html)

**Installa pinia**
```sh
yarn add pinia
```

**Aggiungi il pacchetto al `main.ts`**

```ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```


## Primevue

Segui la guida ufficiale su [Primevue](https://primevue.org/vite).
Per impostare primevue v4 installa il pacchetto corrispondente:

```sh
yarn add primevue @primeuix/themes
```

E registra il plugin a livello globale

```js
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
```

Per utilizzare i componenti puoi scegliere se registrarli globamente o importarli localmente all'interno dei componente che ne fanno utilizzo

**Registrazione globale**
```js
import Button from "primevue/button"

const app = createApp(App);
app.component('Button', Button);
```
**Registrazione locale**
```js
<template>
    <Button label="Hello"></Button>
</template>
<script setup lang="ts">
import { Button } from "primevue";
</script>
```

Con questa configurazione di progetto consiglio di utilizzare la registrazione locale in modo da limitare i conflitti.

## Tailwind CSS

Vai su [Tailwindcss](https://tailwindcss.com/docs/installation/using-vite) e segui la guida all'installazione basata su **Vite** come environment.

**Installa il pacchetto**
```sh
yarn add tailwindcss @tailwindcss/vite
```

**Configura il plugin vite**
```js
//vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

**Importa tailwind css all'interno del main file css**

```css
/*styles.css*/
@import "tailwindcss";
```

## Integrazione Tailwind con Primevue

Esiste una [procedura di integrazione di tailwind con primevue](https://primevue.org/tailwind/). 


```sh
yarn add tailwindcss-primeui
```

Importa il file `tailwindcss-primeui` all'interno del main css

```css
/*styles.css*/
@import "tailwindcss"; /** Già importato nell'installazione di tailwind */
@import "tailwindcss-primeui";
```

Se tutto funziona puoi provare con uno snippet di codice che comprende tailwind con le variabili del tema di primevue.

```html
<div class="flex flex-col gap-12">
    <div class="flex gap-6 flex-wrap">
        <div class="rounded-border p-4 border border-transparent flex items-center justify-center bg-primary hover:bg-primary-emphasis text-primary-contrast font-medium flex-auto transition-colors">primary</div>
        <div class="rounded-border p-4 border border-transparent flex items-center justify-center bg-highlight hover:bg-highlight-emphasis font-medium flex-auto transition-colors">highlight</div>
        <div class="rounded-border p-4 border border-surface flex items-center justify-center text-muted-color hover:text-color hover:bg-emphasis font-medium flex-auto transition-colors">box</div>
    </div>
</div>
```

## Ionic

Su [Ionic](https://ionicframework.com/docs/intro/cdn), vai su **Getting Started**, **Packages & CDN** capitolo **Ionic + Vue** e segui la procedura.

**Installa Ionic**

```sh
yarn add @ionic/vue @ionic/vue-router
```

**Registra il plugin a livello globale**

```js
import { IonicVue } from '@ionic/vue';

import App from './App.vue';
import router from './router';

const app = createApp(App).use(IonicVue).use(router);

router.isReady().then(() => {
  app.mount('#app');
});
```

A questo punto consiglio di impostare il routing e creare qualche pagina

**Imposta il routing**

Crea un file per gestire il routing `router/index` e qualche pagina per gestire il routing.

```sh
@/components/views/Tabs.vue
@/components/views/Tab1.vue
@/components/views/Tab2.vue
@/components/views/Tab3.vue
```

**Tabs** è il componente Root che gestirà la navigazione mentre **Tab1**,**Tab2**,**Tab3**, sono pagine di esempio.

```js
//router/index.ts
import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '@/components/views/Tabs.vue';
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    name: 'Tabs',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: 'tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/components/views/Tab1.vue'),
      },
      {
        path: 'tab2',
        component: () => import('@/components/views/Tab2.vue'),
      },
      {
        path: 'tab3',
        component: () => import('@/components/views/Tab3.vue'),
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```


Modifica il file `App.vue` aggiungendo il wrapper di routing Ionic

```html
<!--App.vue-->
<script setup lang="ts">
import {IonRouterOutlet } from '@ionic/vue';
</script>

<template>
<ion-router-outlet></ion-router-outlet>
</template>

<style scoped>
</style>
```

A questo punto puoi provare a creare delle pagine di esempio e passare da una pagina all'altra con una gestione a Tabs.

```html
<!--Tabs.vue-->
<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="triangle" />
          <ion-label>Tab 1</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="ellipse" />
          <ion-label>Tab 2</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon :icon="square" />
          <ion-label>Tab 3</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { ellipse, square, triangle } from "ionicons/icons";
</script>

```


















