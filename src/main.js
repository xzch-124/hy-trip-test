import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores/index'
import { Tabbar, TabbarItem } from 'vant';

import "normalize.css"
import "./assets/css/index.css"

const app = createApp(App);
app.use(router).use(pinia).use(Tabbar).use(TabbarItem);
app.mount('#app')
