import { ModuleItem } from "./index";
import { RouterTransition } from "@/components/transition";

const testModules: ModuleItem[] = [
    {
        title: "测试",
        name: "test",
        component: RouterTransition,
        children: [
            {
                name: "Test",
                title: "测试页面",
                component: () => import("@/views/test/Test.vue"),
            },
            {
                name: "baidu",
                title: "百度",
                path: "https://www.baidu.com",
            },
            {
                title: "error",
                name: "error",
                component: RouterTransition,
                children: [
                    {
                        name: "403",
                        component: () => import("@/views/system/error/403.vue"),
                    },
                    {
                        name: "404",
                        component: () => import("@/views/system/error/404.vue"),
                    },
                    {
                        name: "500",
                        component: () => import("@/views/system/error/500.vue"),
                    },
                ],
            },
        ],
    },
];

export default testModules;
