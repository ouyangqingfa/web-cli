import { MenuModel, OrgModel, UserModel } from "@/api/types/System";
import { get, post, getPage, postPage } from "../";

const org = {
    getOrgData: () => postPage<OrgModel>("/api/system/sysOrg/selectAll"),
    saveOrg: (org: OrgModel) => post<number>("/api/system/sysOrg/saveOrUpdate", undefined, org),
    deleteOrg: (id: number) => post<number>("/api/system/sysOrg/delete", { id: id }),
};

const sysApi = {
    getUserList: () => postPage<UserModel>("/api/system/sysUser/selectAll"),
    saveUser: (user: UserModel) => post<boolean>("/api/system/sysUser/save", undefined, user),
};
export default { ...org, ...sysApi };
