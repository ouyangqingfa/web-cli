<!-- SingleLayout -->
<template>
    <div class="singlelayout-container">
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
</script>

<style lang="less" scoped>
.singlelayout-container {
    width: 100%;
    height: 100%;
}
</style>
