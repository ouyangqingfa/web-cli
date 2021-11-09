const allModules = {
    "views/test/Test": () => import("@/views/test/Test.vue"),
    "views/system/error/403": () => import("@/views/system/error/403.vue"),
    "views/system/error/404": () => import("@/views/system/error/404.vue"),
    "views/system/error/500": () => import("@/views/system/error/500.vue"),
} as any;
export default allModules;
