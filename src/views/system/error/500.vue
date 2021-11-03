<template>
  <a-result status="500" title="500" sub-title="服务器发生错误">
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
