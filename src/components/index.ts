import { App } from "vue";

import svgIcon from "./svgIcon/index.vue";
import AntdIcon from "./antdIcon";

export function setupGlobalComponents(app: App<Element>) {
    app.component("svg-icon", svgIcon);
    app.component("icon", AntdIcon);
}
