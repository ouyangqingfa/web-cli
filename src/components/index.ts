import { App } from "vue";

import svgIcon from "./svgIcon/index.vue";

export function setupGlobalComponents(app: App<Element>) {
    app.component("svg-icon", svgIcon);
}
