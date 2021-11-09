<!--左侧大菜单-->
<template>
    <a-menu mode="inline" theme="dark" @click="onMenuItemClick">
        <MenuItem v-for="menu in menus" v-bind:menu="menu" />
    </a-menu>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouteRecordRaw, useRouter } from "vue-router";
import MenuItem from "./MenuItem.vue";

const router = useRouter();
const menus = ref<RouteRecordRaw[]>([]);

onMounted(() => {
    menus.value = router.getRoutes().find(m => m.name === "layout")?.children ?? [];
});

function onMenuItemClick(para: any) {
    router.push({ name: para.key });
}
</script>

<style lang="less" scoped></style>
