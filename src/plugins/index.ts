import { App } from "vue";

import { setupAntd } from "./Antd";
import { setupExtMethods } from "./ExtensionMethods";
import { setupVxeTable } from "./VxeTable";
import { setupPinia } from "./Pinia";

export function setupPlugins(app: App<Element>) {
    setupExtMethods();
    setupPinia(app);
    setupAntd(app);
    setupVxeTable(app);
}
