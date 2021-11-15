<template>
    <template v-if="menu.children?.length">
        <a-sub-menu :key="menu.name">
            <template #icon>
                <!-- <AntdIcon v-if="menu.meta?.icon" type="logout-outlined" /> -->
                <MenuOutlined />
            </template>
            <template #title>
                <span>{{ menu.meta?.title }}</span>
            </template>
            <template v-for="child in menu.children">
                <MenuItem :menu="child" />
            </template>
        </a-sub-menu>
    </template>
    <template v-else>
        <a-menu-item :key="menu.name">
            <template #icon>
                <!-- <AntdIcon v-if="menu.meta?.icon" :type="String(menu.meta.icon)" /> -->
                <MenuOutlined />
            </template>
            <span>{{ menu.meta?.title }}</span>
        </a-menu-item>
    </template>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { RouteRecordRaw } from "vue-router";
import { MenuOutlined } from "@ant-design/icons-vue";
// import AntdIcon from "@/components/antdIcon";

defineProps({
    menu: {
        type: Object as PropType<RouteRecordRaw>,
        required: true,
    },
});
</script>

<style lang="less" scoped></style>
