import { MenuModel, OrgModel, RoleMenuModel, RoleModel, UserModel } from "@/api/types/System";
import { get, post, getPage, postPage } from "../";

const org = {
    getOrgData: () => postPage<OrgModel>("/api/system/sysOrg/selectAll"),
    saveOrg: (org: OrgModel) => post<number>("/api/system/sysOrg/saveOrUpdate", undefined, org),
    deleteOrg: (id: number) => post<number>("/api/system/sysOrg/delete", { id: id }),
};

const sysApi = {
    getUserList: (current: number, pageSize: number, parm: UserParams) =>
        postPage<UserModel>("/api/system/sysUser/getUserPage", { current: current, pageSize: pageSize }, parm),
    saveUser: (create: boolean, user: UserModel) => post<boolean>("/api/system/sysUser/save", { create: create }, user),
};

const roleApi = {
    getRoleList: () => postPage<RoleModel>("/api/system/sysRoles/selectAll"),
    saveRole: (role: RoleModel) => post<number>("/api/system/sysRoles/saveOrUpdate", undefined, role),
    deleteRole: (id: number) => post<number>("/api/system/sysRoles/delete", { id: id }),

    saveRoleMenus: (roleId: string, menus: RoleMenuModel[]) => post<boolean>("/api/system/sysRoleMenus/save", { roleId: roleId }, menus),
    getRoleMenus: (roleId: string) => postPage<RoleMenuModel>("/api/system/sysRoleMenus/getRoleMenus", { roleId: roleId }),
};

export default { ...org, ...sysApi, ...roleApi };

export interface UserParams {
    roleId?: string;
    orgId?: string;
    name?: string;
}
