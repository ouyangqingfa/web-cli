<!-- 默认布局 -->
<template>
    <a-layout>
        <a-layout-sider v-model:collapsed="collapsed" collapsible :trigger="null" :collapsedWidth="64" class="layout-default-sider">
            <div class="sider-header">
                <div class="sider-logo-warp"></div>
            </div>
            <div class="sider-content">
                <SiderMenu />
            </div>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="layout-default-header">
                <div class="header-content">
                    <div class="header-collapsed-menu" @click="collapsed = !collapsed">
                        <MenuUnfoldOutlined v-if="collapsed" />
                        <MenuFoldOutlined v-else />
                    </div>
                    <a-breadcrumb>
                        <template v-for="(routeItem, rotueIndex) in $route.matched" :key="routeItem.name">
                            <a-breadcrumb-item>
                                <span>{{ routeItem.meta.title }}</span>
                                <template v-if="routeItem.children.length" #overlay>
                                    <a-menu :selectedKeys="[$route.matched[rotueIndex + 1]?.name]">
                                        <template v-for="childItem in routeItem.children">
                                            <a-menu-item v-if="!childItem.meta?.hidden" :key="childItem.name">
                                                <router-link :to="{ name: childItem.name }" custom #="{ navigate }">
                                                    <div @click="navigate">{{ childItem.meta?.title }}</div>
                                                </router-link>
                                            </a-menu-item>
                                        </template>
                                    </a-menu>
                                </template>
                            </a-breadcrumb-item>
                        </template>
                    </a-breadcrumb>
                    {{ tsDate }}
                </div>
                <div class="header-extra">
                    <a-dropdown trigger="click">
                        <div class="header-extra-user">
                            <div class="header-extra-user-icon">
                                <UserOutlined />
                            </div>
                            <span>{{ userStore.uname }}</span>
                        </div>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item @click="onLogoutClick">退出登录</a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </div>
            </a-layout-header>
            <a-layout-content>
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/store/UserStore";
import router from "@/router";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";
import SiderMenu from "./siderMenu/index.vue";

const collapsed = ref(false);
const userStore = useUserStore();

userStore.loadByStorage();

//退出登录
function onLogoutClick() {
    Modal.confirm({
        centered: true,
        title: "登出确认",
        content: "确定退出登录吗？",
        onOk: () => {
            userStore.logout();
            router.push("/login");
        },
    });
}

const tsDate = ref("");
</script>

<style lang="less" scoped>
.ant-layout {
    width: 100%;
    height: 100%;
}

.layout-default-sider {
    .sider-header {
        width: 100%;
        height: 64px;
        padding: 12px;

        .sider-logo-warp {
            width: 100%;
            height: 100%;
            background-color: #aaaaaa;
        }
    }

    .sider-content {
        width: 100%;
        height: calc(100% - 64px);
        overflow-y: auto;
    }
}

.layout-default-header {
    background: #fff;
    padding: 0 20px;
    display: flex;
    flex-direction: row;

    .header-content {
        flex: 1;
        height: 100%;

        & > div {
            display: inline-block;
            margin-right: 12px;
        }

        .header-collapsed-menu {
            cursor: pointer;
        }
    }

    .header-extra {
        height: 100%;
        width: auto;

        & > div {
            display: inline-block;
        }

        .header-extra-user {
            line-height: 36px;
            user-select: none;
            cursor: pointer;

            .header-extra-user-icon {
                width: 24px;
                height: 24px;
                border-radius: 12px;
                display: inline-block;
                background-color: #108ee9;
                line-height: 24px;
                text-align: center;
                font-size: 14px;
                color: #cccccc;
                margin-right: 6px;
            }
        }
    }
}
</style>
