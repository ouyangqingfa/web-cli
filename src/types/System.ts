//菜单信息
export interface MenuModel {
    name: string;
    url: string;
    menuPath: string;
}

export interface UserModel {
    token?: string;
    id?: string;
    name?: string;
    // [key: string]: any;
}
