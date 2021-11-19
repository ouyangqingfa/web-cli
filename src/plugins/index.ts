import { App } from "vue";

import { setupAntd } from "./Antd";
import { setupExtMethods } from "./ExtensionMethods";

export function setupPlugins(app: App<Element>) {
    setupExtMethods();
    setupAntd(app);
}
