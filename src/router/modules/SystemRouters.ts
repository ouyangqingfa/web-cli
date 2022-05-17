import { ModuleItem } from "./index";

const systemMenus: ModuleItem[] = [
    {
        title: "系统管理",
        icon: "",
        name: "/system/manage",
        children: [
            {
                name: "role",
                title: "角色管理",
                component: () => import("@/views/system/manage/role/RoleManager.vue"),
            },
            {
                name: "user",
                title: "用户管理",
                component: () => import("@/views/system/manage/user/UserManager.vue"),
            },
        ],
    },
];

export default systemMenus;
