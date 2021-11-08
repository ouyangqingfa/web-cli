//动态生成路由

import router, { routes } from "@/router";
import allMenus from "./modules";
import { Empty } from "ant-design-vue";
import { RouteRecordRaw } from "vue-router";
import { MenuModel } from "@/types/System";
import store from "@/store";
import { AsyncRouter } from "@/store/modules/AsyncRouter";

export function generateRouters() {
    return new Promise((resolve, reject) => {
        let menus: MenuModel[] = [{ name: "test", url: "/test/test", menuPath: "views/test/Test.vue" }];

        const layout = routes.find(item => item.name == "layout")!;
        if (layout) {
            let childs: RouteRecordRaw[] = [];
            menus.forEach(m => {
                const component = allMenus[m.menuPath] || Empty;
                childs.push({
                    name: m.name,
                    path: m.url,
                    component: component,
                });
            });
            layout.children = childs;
            router.addRoute(layout);
        }

        const routerStore = store.get<AsyncRouter>(AsyncRouter.SKEY);
        routerStore.menus = menus;
        resolve(menus);
    });
}
