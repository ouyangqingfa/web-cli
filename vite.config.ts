import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { svgBuilder } from "./src/build/svg/svgBuilder";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), svgBuilder("./src/icons/svg/")],
    resolve: {
        alias: {
            "@": "/src",
        },
    },
    server: {
        fs: { strict: false },
        host: "0.0.0.0",
        port: 18000,
        hmr: true,
        proxy: {
            "/api": {
                target: "http://127.0.0.1:18777",
                changeOrigin: true,
            },
        },
    },
    css: {
        preprocessorOptions: {
            less: {},
        },
    },
});

