<!--左侧大菜单-->
<template>
    <a-menu mode="inline" theme="dark" :inlineCollapsed="collapsed" v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys" @click="onMenuItemClick">
        <MenuItem v-for="menu in menus" v-bind:menu="menu" />
    </a-menu>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { RouteRecordRaw, useRouter, useRoute } from "vue-router";
import MenuItem from "./MenuItem.vue";

defineProps({
    collapsed: {
        type: Boolean,
        default: false,
    },
});

const router = useRouter();
const route = useRoute();
const menus = ref<RouteRecordRaw[]>([]);
const openKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([]);

watchEffect(() => {
    openKeys.value = [route.matched[1]?.name?.toString() ?? ""]
    selectedKeys.value = [route.name?.toString() ?? ""]
})

onMounted(() => {
    menus.value = router.getRoutes().find(m => m.name === "layout")?.children ?? [];
});

function onMenuItemClick(para: any) {
    if (/http(s)?:/.test(para.key)) {
        window.open(para.key);
    } else {
        router.push({ name: para.key });
    }
}
</script>

<style lang="less" scoped>
</style>
