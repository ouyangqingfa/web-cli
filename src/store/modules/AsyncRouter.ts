import { MenuModel } from "@/types/System";
import { getUserMenus } from "@/api/modules/System";

//异步路由信息
export class AsyncRouter {
    public static readonly SKEY = "AsyncRouter";

    public menus: MenuModel[] = [];

    /**
     * getDynamicMenu
     */
    public getDynamicMenu(): Promise<MenuModel[]> {
        return new Promise<MenuModel[]>((resolve, reject) => {
            getUserMenus()
                .then(res => {
                    this.menus = res.data;
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}

export default AsyncRouter;
