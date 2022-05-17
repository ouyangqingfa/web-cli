<!-- 机构 -->
<template>
    <a-card :bordered="false" title="机构信息" class="orgtree-container" :bodyStyle="{ flex: 1, padding: '2px', paddingTop: '8px', overflowY: 'auto' }">
        <template #extra>
            <div class="org-tree-extra-warp">
                <icon type="redo" @click="refreshOrgTree" />
                <icon type="plus" @click="onAddOrgClick" />
            </div>
        </template>
        <a-spin :spinning="loadingData">
            <a-tree :tree-data="treeData" show-icon block-node defaultExpandAll v-if="treeData.length > 0" @select="onTreeSelected">
                <template #title="{ title, dataRef }">
                    <a-dropdown :trigger="['contextmenu']">
                        <div style="width: 100%; height: 100%">{{ title }}</div>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item key="1" @click="onNewChildOrg(dataRef)">添加子项</a-menu-item>
                                <a-menu-item key="2" @click="onEditOrg(dataRef)">编辑</a-menu-item>
                                <a-menu-item key="3" @click="onDeleteOrg(dataRef)">删除</a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </template>
            </a-tree>
        </a-spin>
        <a-modal v-model:visible="showEditModal" title="机构信息编辑" width="600px" :maskClosable="false" @cancel="showEditModal = false" @ok="onSaveEditOrg">
            <a-form ref="orgEditForm" :model="editOrgModel" :label-col="{ span: 5 }" :rules="rules" :wrapper-col="{ span: 15 }" autocomplete="off">
                <a-form-item label="名称" name="name">
                    <a-input v-model:value="editOrgModel.name" :maxlength="30" />
                </a-form-item>
                <a-form-item label="父级">
                    <a-tree-select
                        allow-clear
                        show-search
                        style="width: 100%"
                        v-model:value="editOrgModel.pid"
                        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                        placeholder="请选择机构"
                        tree-default-expand-all
                        :tree-data="treeData"
                    ></a-tree-select>
                </a-form-item>
                <a-form-item label="备注">
                    <a-textarea v-model:value="editOrgModel.remarks"></a-textarea>
                </a-form-item>
            </a-form>
        </a-modal>
    </a-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { OrgModel } from "@/api/types/System";
import api from "@/api";
import { FormInstance } from "ant-design-vue";
import type { Rule } from "ant-design-vue/es/form";
import { message, Modal } from "ant-design-vue";
import { deepClone } from "@/utils/ObjectUtil";
import { OrgTreeItem } from "./types";

const emits = defineEmits(["orgSelected", "orgDataChange"]);

onMounted(() => {
    loadOrgData();
});

const loadingData = ref(false);
const orgData = ref<Array<OrgModel>>([]);
const treeData = computed(() => {
    let data = orgData.value.mapTree("orgId", "pid", (o): OrgTreeItem => ({ title: o.name, key: o.orgId!, value: o.orgId! }), "children");
    data.treeCall("children", (item, parent) => {
        item.path = [...(parent?.path ?? []), item.key];
    });
    emits("orgDataChange", data);
    return data;
});

function loadOrgData() {
    loadingData.value = true;
    api.system
        .getOrgData()
        .then((res) => {
            orgData.value = res.data;
        })
        .finally(() => {
            loadingData.value = false;
        });
}

function refreshOrgTree() {
    loadOrgData();
}

const editOrgModel = ref<OrgModel>({ name: "", sort: 0 });
const showEditModal = ref(false);

const orgEditForm = ref<FormInstance>();
const rules: Record<string, Rule[]> = {
    name: [{ required: true, trigger: "change", message: "请输入机构名称" }],
};

function onAddOrgClick() {
    editOrgModel.value = { name: "", sort: 0 };
    showEditModal.value = true;
}
function onSaveEditOrg() {
    orgEditForm.value?.validate().then(() => {
        api.system.saveOrg(editOrgModel.value).then((res) => {
            if (res.data > 0) {
                showEditModal.value = false;
                loadOrgData();
            }
        });
    });
}

//单选机构
function onTreeSelected(selectedKeys: string[], e: { selected: boolean; selectedNodes: OrgTreeItem; node; event }) {
    if (selectedKeys.length > 0) {
        let orgModel = orgData.value.find((a) => a.orgId == selectedKeys.first());
        emits("orgSelected", orgModel);
    } else {
        emits("orgSelected", undefined);
    }
}
//添加子项
function onNewChildOrg(parent: OrgTreeItem) {
    editOrgModel.value = { name: "", sort: 0, pid: parent.key };
    showEditModal.value = true;
}
function onEditOrg(org: OrgTreeItem) {
    let orgItem = orgData.value.find((a) => a.orgId == org.key);
    if (orgItem) {
        editOrgModel.value = deepClone(orgItem);
        showEditModal.value = true;
    }
}
function onDeleteOrg(org: OrgTreeItem) {
    let orgItem = orgData.value.find((a) => a.orgId == org.key);
    if (orgItem && orgItem.id) {
        Modal.confirm({
            title: "删除确认",
            content: `确定删除${org.title}吗？子项将会一起被删除。`,
            onOk: () => {
                api.system.deleteOrg(orgItem!.id!).then((res) => {
                    if (res.data > 0) {
                        loadOrgData();
                    } else {
                        message.error("操作失败!" + res.msg);
                    }
                });
            },
        });
    } else {
        message.error("机构信息有误");
    }
}
</script>

<style lang="less" scoped>
.orgtree-container {
    display: flex;
    flex-direction: column;

    .org-tree-extra-warp {
        & > span {
            &:not(:last-child) {
                margin-right: 8px;
            }
        }
    }
}
</style>
