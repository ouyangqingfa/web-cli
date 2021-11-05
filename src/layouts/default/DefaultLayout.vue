<!-- 默认布局 -->
<template>
    <a-layout>
        <a-layout-sider v-model:collapsed="collapsed" collapsible :trigger="null"> </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0"> </a-layout-header>
            <a-layout-content>
                <div>aaaa:{{ userStore.token }}</div>
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";

const collapsed = ref(false);

import store from "@/store";
import { UserStore } from "@/store/modules/User";

const userStore = store.get<UserStore>(UserStore.SKEY);
</script>

<style lang="less" scoped>
.ant-layout {
    width: 100%;
    height: 100%;
}
</style>
