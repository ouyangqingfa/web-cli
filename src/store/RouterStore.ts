import { store } from "@/plugins/Pinia";
import { defineStore } from "pinia";
import { MenuModel } from "@/api/types/System";
import apis from "@/api";
import { routes } from "@/router";

export const useRouterStore = defineStore("routerStore", {
    state: () => {
        const userMenus: MenuModel[] = [];
        return {
            routeLoaded: false,
            menus: userMenus,
        };
    },
    getters: {},
    actions: {
        getDynamicMenu(): Promise<MenuModel[]> {
            return new Promise<MenuModel[]>((resolve, reject) => {
                apis.user
                    .getUserMenus()
                    .then((res) => {
                        this.menus = res.data;
                        this.routeLoaded = true;
                        resolve(res.data);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        clearMenus() {
            this.menus = [];
            const layout = routes.find((item) => item.name == "layout")!;
            layout.children?.clear();
            this.routeLoaded = false;
        },
    },
});

export function useRouterStoreWithOut() {
    return useRouterStore(store);
}
