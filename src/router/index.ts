import { App } from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from "vue-router";
import { createRouterGuards } from "./RouterGuards";

export const notFound: RouteRecordRaw = {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    redirect: "/error/404",
    component: () => import("@/views/system/error/404.vue"),
};

export const routes: Array<RouteRecordRaw> = [
    {
        path: "/error/403",
        name: "403",
        meta: { static: true },
        component: () => import("@/views/system/error/403.vue"),
    },
    {
        path: "/error/404",
        name: "404",
        meta: { static: true },
        component: () => import("@/views/system/error/404.vue"),
    },
    {
        path: "/error/500",
        name: "500",
        meta: { static: true },
        component: () => import("@/views/system/error/500.vue"),
    },
    {
        path: "/login",
        name: "login",
        meta: { static: true },
        component: () => import("@/views/system/login/Login.vue"),
    },
    {
        path: "/",
        name: "layout",
        meta: { title: "首页" },
        component: () => import("@/layouts/default/DefaultLayout.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export function setupRouter(app: App<Element>) {
    app.use(router);
    createRouterGuards(router);
}

export default router;
