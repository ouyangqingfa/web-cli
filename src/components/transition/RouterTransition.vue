<template>
    <router-view v-slot="{ Component, route }">
        <transition name="zoom-fade" mode="out-in" appear>
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
/* router view transition */
.zoom-fade-enter-active,
.zoom-fade-leave-active {
    transition: transform 0.35s, opacity 0.28s ease-in-out;
}

.zoom-fade-enter-from {
    opacity: 0;
    transform: scale(0.97);
}

.zoom-fade-leave-to {
    opacity: 0;
    transform: scale(1.03);
}
</style>
