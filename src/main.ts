import './assets/styles/main.css';
import './assets/styles/styles.scss';
import '/node_modules/primeflex/primeflex.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useIconsStore } from '@/shared/stores/icons-store';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

useIconsStore().addIcon([{ iconKey: 'fas fa-house', iconObject: faHouse }]);
app.mount('#app');
