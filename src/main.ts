import { createApp } from "vue";
import App from "./App.vue";
import "@/types/index";
import router, { setupRouter } from "./router/index";

import { setupStore } from "./store";
import { setupPlugins } from "./plugins";
import { setupGlobalComponents } from "@/components/index";

const app = createApp(App);

setupPlugins(app);
setupStore();
setupRouter(app);
setupGlobalComponents(app);

router.isReady().then(() => app.mount("#app"));
