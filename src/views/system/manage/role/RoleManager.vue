<!-- 角色管理 -->
<template>
    <div class="rolemanager-container">
        <RoleList @selectRole="onRoleSelected" class="role-container" />
        <a-tabs class="role-detail-container" size="large" :tabBarStyle="{ padding: '0 12px' }">
            <template #rightExtra>
                <a-button type="primary">保存</a-button>
            </template>
            <a-tab-pane key="1">
                <template #tab>
                    <span class="role-tab-title">菜单权限</span>
                </template>
                <div class="rolemenus-container">
                    <a-spin :spinning="loadingRoleMenus">
                        <a-tree
                            block-node
                            defaultExpandAll
                            checkable
                            :tree-data="allMenus"
                            v-model:checkedKeys="selMenus"
                            :disabled="!selRole"
                            @select="onTreeItemSelect"
                        >
                            <template #title="{ title, key }">
                                {{ title ?? key }}
                            </template>
                        </a-tree>
                    </a-spin>
                </div>
            </a-tab-pane>
            <a-tab-pane key="2">
                <template #tab>
                    <span class="role-tab-title">用户列表</span>
                </template>
                <UserList :role="selRole" />
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import RoleList from "./RoleList.vue";
import UserList from "./UserList.vue";
import allMenus from "@/router/modules/index";
import { RoleModel } from "@/api/types/System";

const selRole = ref<RoleModel>();
const loadingRoleMenus = ref(false);
const selMenus = ref<string[]>([]);

function onRoleSelected(role: RoleModel) {
    selRole.value = role;
    selMenus.value = [];
    loadingRoleMenus.value = true;
    setTimeout(() => {
        loadingRoleMenus.value = false;
    }, 1000);
}

function onTreeItemSelect(selectedKeys: string[], e: { selected: boolean; selectedNodes; node; event }) {
    if (selRole.value) {
        const nodeKey = e.node.key;
        if (e.selected) {
            if (!selMenus.value.exist((a) => a == nodeKey)) {
                selMenus.value.push(nodeKey);
            }
        } else {
            selMenus.value.delete(nodeKey);
        }
    }
}
</script>

<style lang="less" scoped>
::v-deep(.ant-tabs-content) {
    width: 100%;
    height: 100%;
}
.rolemanager-container {
    width: 100%;
    height: 100%;
    padding: 16px;
    display: flex;
    flex-direction: row;

    & > div {
        background-color: #fff;
    }

    .role-container {
        width: 350px;
        height: 100%;
        margin-right: 16px;
    }

    .role-detail-container {
        flex: 1;
        height: 100%;

        .role-tab-title {
            padding: 0 24px;
        }

        .rolemenus-container {
            width: 100%;
            height: 100%;
            padding: 0 16px;
        }
    }
}
</style>
