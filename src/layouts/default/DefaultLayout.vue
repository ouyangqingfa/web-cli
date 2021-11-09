<!-- 默认布局 -->
<template>
    <a-layout>
        <a-layout-sider v-model:collapsed="collapsed" collapsible :trigger="null" :collapsedWidth="64" class="layout-default-sider">
            <div class="sider-header">
                <div class="sider-logo-warp"></div>
            </div>
            <div class="sider-content">
                <!-- <a-menu>
                    <a-menu-item key="1234" path="/test/test">111</a-menu-item>
                </a-menu> -->
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
                    {{ tsDate }}
                </div>
                <div class="header-extra">
                    <a-dropdown trigger="click">
                        <div class="header-extra-user">
                            <div class="header-extra-user-icon">
                                <UserOutlined />
                            </div>
                            <span>{{ userStore.name }}</span>
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
import store from "@/store";
import router from "@/router";
import { UserStore } from "@/store/modules/User";
import { AsyncRouter } from "@/store/modules/AsyncRouter";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";
import SiderMenu from "./siderMenu/index.vue";

import Api from "@/api";

const collapsed = ref(false);
const userStore = store.get<UserStore>(UserStore.SKEY);
const routerStore = store.get<AsyncRouter>(AsyncRouter.SKEY);
const { menus } = routerStore;

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
setInterval(() => {
    Api.getlastTime.do<string>().then(res => {
        tsDate.value = res.data;
    });
}, 3000);
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
            display: inline;
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
