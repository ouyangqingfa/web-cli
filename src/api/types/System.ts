//菜单信息
export interface MenuModel {
    id: number;
    /** 菜单ID */
    mid: string | number;
    /** 父菜单ID */
    pid?: string | number | undefined | null;
    /** 菜单标识KEY */
    key: string;
    /** 菜单名称 */
    title?: string;
    /** 菜单图标 */
    icon?: string;
    /** 组件 配置key  */
    component?: string;
    /** 子菜单 */
    children?: MenuModel[];
}
//用户信息
export interface UserModel {
    id?: number;
    uid: string;
    uname: string;
    password?: string;
    company?: string;
    department?: string[];
    job?: string;
    sno?: string;
    idNum?: string;
    email?: string;
    phone?: string;
    avatar?: string;
    sign?: string;
    regDate?: string;
    status?: number;
    creator?: string;
    createTime?: string;
    remark?: string;
    token?: string;
    updater?: string;
    updateTime?: string;
}
//机构信息
export interface OrgModel {
    id?: number;
    orgId?: string;
    pid?: string;
    name: string;
    sort: number;
    creator?: string;
    createTime?: string;
    updater?: string;
    updateTime?: string;
    remarks?: string;
}
