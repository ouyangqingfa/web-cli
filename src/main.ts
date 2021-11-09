import { createApp } from "vue";
import App from "./App.vue";
import "@/types/index";
import router, { setupRouter } from "./router/index";

import { setupStore } from "./store";
import { setupAntd, setupExtMethods } from "./plugins";

const app = createApp(App);

setupExtMethods();
setupAntd(app);
setupStore();
setupRouter(app);

router.isReady().then(() => app.mount("#app"));
