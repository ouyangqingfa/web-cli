<template>
    <router-view v-slot="{ Component, route }">
        <transition name="zoom-fade" mode="out-in" appear>
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped></style>
