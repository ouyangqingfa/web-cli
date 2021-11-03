<template>
  <a-result status="403" title="403" sub-title="你没有权限访问该页面">
    <template #extra>
      <a-button type="primary" @click="backToHome">回到主页</a-button>
    </template>
  </a-result>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

let router = useRouter();
function backToHome() {
  router.push("/");
}
</script>

<style lang="less" scoped></style>
