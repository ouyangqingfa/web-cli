import { store } from "@/plugins/Pinia";
import { defineStore } from "pinia";
import { MenuModel } from "@/types/System";
import { getUserMenus } from "@/api/modules/System";

export const useRouterStore = defineStore("routerStore", {
    state: () => {
        const userMenus: MenuModel[] = [];
        return {
            menus: userMenus,
        };
    },
    getters: {},
    actions: {
        getDynamicMenu(): Promise<MenuModel[]> {
            return new Promise<MenuModel[]>((resolve, reject) => {
                getUserMenus()
                    .then((res) => {
                        this.menus = res.data;
                        resolve(res.data);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
    },
});

export function useRouterStoreWithOut() {
    return useRouterStore(store);
}
