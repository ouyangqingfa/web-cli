import { ModuleItem } from "../RouterMenus";
import { RouterTransition } from "@/components/transition";

const systemMenus: ModuleItem[] = [
    {
        title: "系统管理",
        icon: "",
        key: "/system/manage",
        component: RouterTransition,
        children: [
            {
                key: "role",
                title: "角色管理",
                component: () => import("@/views/system/manage/role/RoleManager.vue"),
            },
            {
                key: "user",
                title: "用户管理",
                component: () => import("@/views/system/manage/user/UserManager.vue"),
            },
        ],
    },
];

export default systemMenus;
