
import './bootstrap';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue'; // root SPA component

createApp(App).use(router).mount('#app');
