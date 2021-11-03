<!-- 默认布局 -->
<template>
    <a-layout>
        <a-layout-sider v-model:collapsed="collapsed" collapsible :trigger="null"> </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0"> </a-layout-header>
            <a-layout-content>
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";

const collapsed = ref(false);
</script>

<style lang="less" scoped>
.ant-layout {
    width: 100%;
    height: 100%;
}
</style>
