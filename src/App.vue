<template>
  <a-config-provider :locale="zhCN">
    <router-view> </router-view>
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import zhCN from "ant-design-vue/lib/locale/zh_CN";

export default defineComponent({
  name: "App",
  setup() {
    return { zhCN };
  },
});
</script>

<style>
.app-main-warp {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
}
</style>
