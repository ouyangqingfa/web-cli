import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: "Login",
        component: () => import('@/views/auth/Login.vue')
    },
    {
        path: "/test/icao",
        name: "ICAO",
        component: () => import("@/views/test/IcaoPos.vue")
    },
    {
        path: "/adzs/outer",
        name: "Outer",
        component: () => import("@/views/adzs/FuncPage.vue")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;