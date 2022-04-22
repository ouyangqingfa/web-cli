import { RouteComponent } from "vue-router";

export interface ModuleItem {
    key: string;
    title?: string;
    icon?: string;
    path?: string;
    component: RouteComponent | (() => Promise<RouteComponent>);
}

const allModules: ModuleItem[] = [
    {
        key: "views/test/Test",
        component: () => import("@/views/test/Test.vue"),
    },
    {
        key: "views/system/error/403",
        component: () => import("@/views/system/error/403.vue"),
    },
    {
        key: "views/system/error/404",
        component: () => import("@/views/system/error/404.vue"),
    },
    {
        key: "views/system/error/500",
        component: () => import("@/views/system/error/500.vue"),
    },
];
export default allModules;
