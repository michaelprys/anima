import { createPinia } from 'pinia';
import { router } from '@/router';
import '@/assets/styles/app.css';
import { createApp } from 'vue';
import App from './App.vue';

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount('#app');
