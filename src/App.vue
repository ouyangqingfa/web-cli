<template>
  <a-config-provider :locale="zhCN">
    <router-view></router-view>
  </a-config-provider>
</template>

<script setup lang="ts">
import zhCN from "ant-design-vue/lib/locale/zh_CN";
import "dayjs/locale/zh-cn";
import dayjs from "dayjs";

dayjs.locale("zh-cn");
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
}
</style>
