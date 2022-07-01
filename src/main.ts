import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

// import { getRequest } from '@/utils/api';
// import { postRequest } from "@/utils/api";
// import { putRequest } from "@/utils/api";
// import { deleteRequest } from "@/utils/api";

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}