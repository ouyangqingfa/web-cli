import { store } from "@/plugins/Pinia";
import { defineStore } from "pinia";
import { RoleMenuModel } from "@/api/types/System";
import apis from "@/api";
import { routes } from "@/router";

export const useRouterStore = defineStore("routerStore", {
    state: () => {
        const userMenus: RoleMenuModel[] = [];
        return {
            routeLoaded: false,
            menus: userMenus,
        };
    },
    getters: {},
    actions: {
        getDynamicMenu(): Promise<RoleMenuModel[]> {
            return new Promise<RoleMenuModel[]>((resolve, reject) => {
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
