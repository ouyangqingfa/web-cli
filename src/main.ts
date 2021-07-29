import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index';

//Antd
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';

//extensions
import '@/utils/extenstions/index'

//Axios
import { Request } from "@/utils/Request";
Request.init();

import './api/mock/index'

//style
import '@/styles/index.less';

import UserConfig from './types/UserConfig';
let config = UserConfig.Instance;
Object.keys(config).forEach(k => {
    config[k] = window.APPCONFIG[k];
});

const app = createApp(App);
// app.config.globalProperties.CONFIG = Object.assign(UserConfig.Instance, window.APPCONFIG);
app.use(router);
app.use(Antd);
app.mount('#app');
