//动态生成路由
import router, { routes, notFound } from "@/router";
import allMenus, { ModuleItem } from "./modules";
import { RouteRecordRaw } from "vue-router";
import { MenuModel } from "@/api/types/System";
import { useRouterStoreWithOut } from "@/store/RouterStore";
import { RouterTransition } from "@/components/transition";
import { useUserStore } from "./../store/UserStore";

const routerStore = useRouterStoreWithOut();

function menuToRoute(item: MenuModel): RouteRecordRaw {
    const menuModel = allMenus.treeFind("children", (m) => m.key == item.key || m.path == item.key);
    return {
        path: `/${item.key}`,
        component: menuModel?.component ?? RouterTransition,
        meta: {
            title: item.title ?? menuModel?.title,
            icon: item.icon ?? menuModel?.icon,
        },
    };
}

function menuListToTree(menus: MenuModel[]): RouteRecordRaw[] {
    let items: Array<MenuModel & { route: RouteRecordRaw }> = menus.map((m) => {
        return { ...m, route: menuToRoute(m) };
    });
    let childs: RouteRecordRaw[] = [];
    const keyMap = items.reduce((acc: { [key: string]: number }, el, index) => {
        acc[el.mid] = index;
        return acc;
    }, {});
    let lated: RouteRecordRaw[] = [];
    items.forEach((item) => {
        if (item.pid === null || item.pid === undefined || item.pid === -1) {
            item.route.name = item.key;
            childs.push(item.route);
        } else {
            const parent = items[keyMap[item.pid]];
            if (parent) {
                item.route.path = item.key; //`${parent.route.path}${item.route.path}`;
                item.route.name = `${parent.route.name?.toString()}_${item.key}`; //防止name重复
                if (parent.route.children) {
                    parent.route.children.push(item.route);
                } else {
                    parent.route.children = [item.route];
                }
            } else {
                console.error("not find parent router but pid is not null");
                lated.push(item.route);
            }
        }
    });
    childs.push(...lated);
    return childs;
}

function buildAdminRoute(): RouteRecordRaw[] {
    let menuRoutes: RouteRecordRaw[] = [];
    allMenus.forEach((m) => {
        menuRoutes.push(menuModelToRoute(m, ""));
    });
    return menuRoutes;
}

function menuModelToRoute(m: ModuleItem, parentPath: string): RouteRecordRaw {
    let path: string = m.key.startsWith("/") ? m.key : parentPath + "/" + m.key;
    let routeItem: RouteRecordRaw = {
        name: m.path ?? path.replaceAll("/", "_"),
        path: path,
        component: m.component ?? RouterTransition,
        meta: {
            title: m.title ?? m.key,
            icon: m.icon ?? "",
        },
    };
    if (m.children) {
        let childs: RouteRecordRaw[] = [];
        m.children.forEach((c) => {
            childs.push(menuModelToRoute(c, path));
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
            layout.children = buildAdminRoute();
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
                    layout.children = menuListToTree(menus);
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
