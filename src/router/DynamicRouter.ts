//动态生成路由
import router, { routes, notFound } from "@/router";
import allMenus, { ModuleItem } from "./modules";
import { RouteRecordRaw } from "vue-router";
import { RoleMenuModel } from "@/api/types/System";
import { useRouterStoreWithOut } from "@/store/RouterStore";
import { RouterTransition } from "@/components/transition";
import { useUserStore } from "./../store/UserStore";

const routerStore = useRouterStoreWithOut();

function buildRoutes(filterMenu: boolean, authMenus: RoleMenuModel[]): RouteRecordRaw[] {
    let menuRoutes: RouteRecordRaw[] = [];
    allMenus.forEach((m) => {
        if (!filterMenu || authMenus.contains((a) => a.menuId == m.key)) {
            menuRoutes.push(menuModelToRoute(m, "", filterMenu, authMenus));
        }
    });
    return menuRoutes;
}

function menuModelToRoute(m: ModuleItem, parentPath: string, filterMenu: boolean, authMenus: RoleMenuModel[]): RouteRecordRaw {
    let path: string = m.name.startsWith("/") ? m.name : parentPath + "/" + m.name;
    let routeItem: RouteRecordRaw = {
        name: m.name ?? path.replaceAll("/", "_"),
        path: path,
        component: m.component ?? RouterTransition,
        meta: {
            title: m.title ?? m.name,
            icon: m.icon ?? "",
        },
    };
    if (m.children) {
        let childs: RouteRecordRaw[] = [];
        m.children.forEach((c) => {
            if (!filterMenu || authMenus.contains((a) => a.menuId == c.key)) {
                childs.push(menuModelToRoute(c, path, filterMenu, authMenus));
            }
        });
        routeItem.children = childs;
    }

    return routeItem;
}

export function generateRouters() {
    return new Promise((resolve, reject) => {
        const layout = routes.find((item) => item.name == "layout")!;
        const userStore = useUserStore();

        if (userStore.isAdmin) {
            //系统管理员
            layout.children = buildRoutes(false, []);
            router.addRoute(layout);
            router.addRoute(notFound);
            resolve(null);
        } else if (userStore.isRoleAdmin) {
            //角色管理员
        } else {
            //普通用户
            routerStore
                .getDynamicMenu()
                .then((menus) => {
                    layout.children = buildRoutes(true, menus);
                    router.addRoute(layout);
                    router.addRoute(notFound);
                    resolve(menus);
                })
                .catch((err) => {
                    console.error(err);
                    reject(err);
                });
        }
    });
}
