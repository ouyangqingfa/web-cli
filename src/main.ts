import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";

import "@/utils/extenstions/index";

//Antd
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";

createApp(App).use(Antd).use(router).mount("#app");
