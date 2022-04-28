import { NavigationGuardNext, RouteLocationNormalized, Router } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import storage from "@/utils/Storage";
import { StorageEnum } from "@/enums/AppEnum";
import { useRouterStoreWithOut } from "@/store/RouterStore";
import { generateRouters } from "./DynamicRouter";

NProgress.configure({ showSpinner: false });
const routerStore = useRouterStoreWithOut();

function loadDynamicRouter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    generateRouters()
        .then(() => {
            next({ ...to, replace: true });
        })
        .catch(() => {
            next({ path: "/error/404" });
        })
        .finally(() => {
            routerStore.routeLoaded = true;
        });
}

/** 路由守卫,权限控制等 */
export function createRouterGuards(router: Router) {
    router.beforeEach((to, from, next) => {
        NProgress.start();
        const token = storage.get(StorageEnum.ACCESS_TOKEN);

        if (token) {
            if (to.name === "login") {
                next({ path: "/" });
            } else {
                if (routerStore.routeLoaded == false) {
                    loadDynamicRouter(to, from, next);
                } else {
                    next();
                }
            }
        } else {
            //not login
            if (to.meta.static === true) {
                next();
            } else {
                next({ path: "/login", replace: true });
            }
        }
    });

    router.afterEach((to, from) => {
        NProgress.done();
    });
}
