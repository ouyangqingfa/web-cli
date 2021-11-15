//动态生成路由
import router, { routes, notFound } from "@/router";
import allMenus from "./modules";
import { RouteRecordRaw } from "vue-router";
import { MenuModel } from "@/types/System";
import store from "@/store";
import { RouterTransition } from "@/components/transition";

function menuToRoute(item: MenuModel): RouteRecordRaw {
    const component = item.component ? allMenus[item.component] : RouterTransition;
    return {
        path: `/${item.key}`,
        component: component,
        meta: {
            title: item.title,
            icon: item.icon,
        },
    };
}

function menuListToTree(menus: MenuModel[]): RouteRecordRaw[] {
    let items: Array<MenuModel & { route: RouteRecordRaw }> = menus.map(m => {
        return { ...m, route: menuToRoute(m) };
    });
    let childs: RouteRecordRaw[] = [];
    const keyMap = items.reduce((acc: { [key: string]: number }, el, index) => {
        acc[el.mid] = index;
        return acc;
    }, {});
    let lated: RouteRecordRaw[] = [];
    items.forEach(item => {
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

export function generateRouters() {
    return new Promise((resolve, reject) => {
        // const routerStore = store.get<AsyncRouter>(AsyncRouter.SKEY);
        store.routerStore
            .getDynamicMenu()
            .then(menus => {
                const layout = routes.find(item => item.name == "layout")!;
                layout.children = menuListToTree(menus);
                router.addRoute(layout);
                router.addRoute(notFound);
                resolve(menus);
            })
            .catch(err => {
                reject(err);
            });
    });
}
