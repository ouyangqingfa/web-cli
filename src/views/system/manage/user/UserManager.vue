<!-- 用户管理 -->
<template>
    <div class="usermanager-container">
        <OrgTree class="dept-container" @orgSelected="onOrgSelected" @orgDataChange="onOrgDataChanged" />
        <UserList :org="selOrg" :orgTreeData="orgTreeData" class="user-container" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import UserList from "./UserList.vue";
import OrgTree from "./OrgTree.vue";
import { OrgModel } from "@/api/types/System";
import { OrgTreeItem } from "./types";

const selOrg = ref<OrgModel>();
const orgTreeData = ref<OrgTreeItem[]>([]);

function onOrgSelected(org: OrgModel) {
    selOrg.value = org;
}
function onOrgDataChanged(tree: OrgTreeItem[]) {
    orgTreeData.value = tree;
}
</script>

<style lang="less" scoped>
.usermanager-container {
    width: 100%;
    height: 100%;
    padding: 16px;
    display: flex;
    flex-direction: row;

    & > div {
        background-color: #fff;
    }

    .dept-container {
        width: 400px;
        height: 100%;
        margin-right: 16px;
    }

    .user-container {
        flex: 1;
        height: 100%;
    }
}
</style>
