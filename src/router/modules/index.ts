import { RouteComponent } from "vue-router";

export interface ModuleItem {
    name: string;
    title?: string;
    icon?: string;
    path?: string;
    component?: RouteComponent | (() => Promise<RouteComponent>);
    children?: ModuleItem[];
    meta?: object;
    key?: string;
}

import test from "./test";
import systemMenus from "./SystemRouters";

const allMenus = [...systemMenus, ...test];

allMenus.treeCall("children", (item, parent) => {
    item.title = item.title ?? item.name;
    item.key = item.name?.startsWith("/") ? item.name : `${parent?.key ?? ""}/${item.name}`;
});
export default allMenus;
