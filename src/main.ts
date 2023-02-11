import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import './style.css';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue';

const Home = () => import('./components/HomeView.vue');
const JSONEditor = () => import('./components/JSONEditor.vue');

const routes = [
  { path: '/', component: Home },
  { path: '/json-edit', component: JSONEditor },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount('#app');
