import { MenuModel, UserModel } from "@/types/System";
import { PageResult } from "@/utils/axios/types";
import { get, post, getPage, postPage } from "../";

export function getUserMenus(): Promise<PageResult<MenuModel>> {
    return new Promise((resolve, reject) => {
        let menus: MenuModel[] = [
            { id: 0, mid: "test", key: "test", title: "测试", icon: "PlayCircleOutlined" },
            { id: 1, mid: "t1", pid: "test", key: "test", title: "test", component: "views/test/Test" },
            { id: 2, mid: "error", key: "error", title: "异常页面" },
            { id: 3, mid: "e403", pid: "error", key: "403", title: "403", component: "views/system/error/403" },
            { id: 4, mid: "e404", pid: "error", key: "404", title: "404", component: "views/system/error/404" },
            { id: 5, mid: "e500", pid: "error", key: "500", title: "500", component: "views/system/error/500" },
            { id: 6, mid: "hh", pid: "hhp", key: "hh", title: "hh", component: "views/system/error/500" },
        ];
        resolve({ code: 1, data: menus, msg: "", pageSize: 0, pageCount: 1, totalSize: menus.length, pageIndex: 1 });
    });
}

export const systemApi = {
    rsa: () => get<string>("/api/system/getRSAKey"),
    login: (uid: string, pwd: string) => post<UserModel>("/api/system/login", { uid: uid }, pwd),
    logout: (uid: string) => post<boolean>("/api/system/logout", { uid: uid }),
};
export default systemApi;
