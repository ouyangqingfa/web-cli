import { ModuleItem } from "./index";
import { RouterTransition } from "@/components/transition";

const testModules: ModuleItem[] = [
    {
        title: "测试",
        key: "test",
        component: RouterTransition,
        children: [
            {
                key: "Test",
                title: "测试页面",
                component: () => import("@/views/test/Test.vue"),
            },
            {
                key: "baidu",
                title: "百度",
                path: "https://www.baidu.com",
            },
            {
                title: "error",
                key: "error",
                component: RouterTransition,
                children: [
                    {
                        key: "403",
                        component: () => import("@/views/system/error/403.vue"),
                    },
                    {
                        key: "404",
                        component: () => import("@/views/system/error/404.vue"),
                    },
                    {
                        key: "500",
                        component: () => import("@/views/system/error/500.vue"),
                    },
                ],
            },
        ],
    },
];

export default testModules;
