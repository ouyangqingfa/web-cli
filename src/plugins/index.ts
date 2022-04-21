import { App } from "vue";

import { setupAntd } from "./Antd";
import { setupExtMethods } from "./ExtensionMethods";
import { setupVxeTable } from "./VxeTable";

export function setupPlugins(app: App<Element>) {
  setupExtMethods();
  setupAntd(app);
  setupVxeTable(app);
}
