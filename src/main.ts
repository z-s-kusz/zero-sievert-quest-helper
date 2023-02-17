import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import './style.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
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
  components,
  directives,
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
