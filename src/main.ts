import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import './style.css';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import App from './App.vue';

const Home = () => import('./components/Home.vue');
const JSONEditor = () => import('./components/JSONEditor.vue');

const routes = [
  { path: '/', component: Home },
  { path: '/edit-json', component: JSONEditor },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const vuetify = createVuetify({
  icons: {
    aliases,
    defaultSet: 'mdi',
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'dark'
  }
});

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount('#app');

// pwa stuff - happens after app setup
window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
});
