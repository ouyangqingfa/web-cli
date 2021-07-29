<!---->
<template>
  <a-layout class="layout-base-warp">
    <a-layout-header>Header</a-layout-header>
    <a-layout>
      <a-layout-sider>Sider</a-layout-sider>
      <a-layout-content class="layout-content-warp">
        <router-view> </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
export default defineComponent({
  name: "BaseLayout",
  setup: () => {
    return {};
  },
});
</script>

<style lang="less" scoped>
.layout-base-warp {
  margin: 0;
  width: 100vw;
  height: 100vh;

  .layout-content-warp {
    width: 100%;
    height: 100%;
  }
}
</style>