import { Router } from "vue-router";

/** 路由守卫,权限控制等 */
export function createRouterGuards(router: Router) {
    router.beforeEach((to, from) => {
        return true;
    });
}
