import './assets/styles/main.css';
import './assets/styles/styles.scss';
import '/node_modules/primeflex/primeflex.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { faBars, faChevronDown, faHouse, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useIconsStore } from '@/shared/stores/icons-store';
import 'animate.css';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

useIconsStore().addIcon([
  { iconKey: 'fas fa-house', iconObject: faHouse },
  { iconKey: 'fas fa-bars', iconObject: faBars },
  { iconKey: 'fas fa-plus', iconObject: faPlus },
  { iconKey: 'fas fa-chevron-down', iconObject: faChevronDown },
  { iconKey: 'fas fa-xmark', iconObject: faXmark },
]);
app.mount('#app');
