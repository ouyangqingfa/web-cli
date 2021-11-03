<template>
  <a-result status="404" title="404" sub-title="你访问的页面不存在">
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
