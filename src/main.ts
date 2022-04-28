import { createApp } from "vue";
import App from "./App.vue";

import { setupPlugins } from "./plugins";
import router, { setupRouter } from "./router/index";
import { setupGlobalComponents } from "@/components/index";

const app = createApp(App);

setupPlugins(app);
setupRouter(app);
setupGlobalComponents(app);

router.isReady().then(() => app.mount("#app"));

