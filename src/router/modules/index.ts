import { RouteComponent } from "vue-router";

export interface ModuleItem {
    key: string;
    title?: string;
    icon?: string;
    path?: string;
    component?: RouteComponent | (() => Promise<RouteComponent>);
    children?: ModuleItem[];
    meta?: object;
}

import test from "./test";
import systemMenus from "./SystemRouters";

export default [...systemMenus, ...test];
