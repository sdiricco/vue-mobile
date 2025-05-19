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