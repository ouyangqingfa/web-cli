import { MenuModel } from "@/types/System";

//异步路由信息
export class AsyncRouter {
    public static readonly SKEY = "AsyncRouter";

    public menus: MenuModel[] = [];
}

export default AsyncRouter;
