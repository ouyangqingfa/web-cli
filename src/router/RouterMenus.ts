import { RouteComponent } from "vue-router";

export interface ModuleItem {
    key: string;
    title?: string;
    icon?: string;
    path?: string;
    component?: RouteComponent | (() => Promise<RouteComponent>);
    children?: ModuleItem[];
}

import test from "./modules/test";
import systemMenus from "./modules/SystemRouters";

export default [...systemMenus, ...test];
