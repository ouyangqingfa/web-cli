import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/error/403",
        name: "403",
        component: () => import("@/views/system/error/403.vue"),
    },
    {
        path: "/error/404",
        name: "404",
        component: () => import("@/views/system/error/404.vue"),
    },
    {
        path: "/error/500",
        name: "500",
        component: () => import("@/views/system/error/500.vue"),
    },
    {
        path: "/system/login",
        name: "login",
        component: () => import("@/views/system/login/Login.vue"),
    },
    {
        path: "/",
        name: "DefaultLayout",
        redirect: "/system/login",
        component: () => import("@/layouts/default/DefaultLayout.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
