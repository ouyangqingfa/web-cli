<!-- RoleList -->
<template>
    <a-card :bordered="false" title="角色" class="rolelist-container" :bodyStyle="{ flex: 1, padding: '2px', overflowY: 'auto' }">
        <template #extra>
            <div class="role-extra-warp">
                <icon type="redo" @click="onRefreshBtnClick" />
                <icon type="plus" @click="addNewBtnClick" />
            </div>
        </template>
        <a-list :dataSource="roleData" :loading="loadingRoleData">
            <template #renderItem="{ item }">
                <a-list-item class="rolelist-item" :select="selRole?.id == item.id" @click="onRoleItemClick(item)">
                    <template #actions>
                        <icon type="edit" @click.stop="onRoleEditClick(item)" />
                        <icon type="delete" @click.stop="onRoleDeleteClick(item)" />
                    </template>
                    <a-list-item-meta :description="item.remarks">
                        <template #title>
                            {{ item.name }}
                        </template>
                        <template #avatar>
                            <a-avatar>
                                <template #icon> <icon type="team" /> </template>
                            </a-avatar>
                        </template>
                    </a-list-item-meta>
                </a-list-item>
            </template>
        </a-list>
        <a-modal v-model:visible="showEditModal" title="角色信息编辑" :maskClosable="false" @cancel="showEditModal = false" @ok="onSaveEditClick">
            <a-form ref="roleInfoEditForm" :model="editRuleModel" :label-col="{ span: 5 }" :rules="rules" :wrapper-col="{ span: 15 }" autocomplete="off">
                <a-form-item label="名称" name="name">
                    <a-input v-model:value="editRuleModel.name" :maxlength="30" />
                </a-form-item>
                <a-form-item label="备注">
                    <a-textarea v-model:value="editRuleModel.remarks"></a-textarea>
                </a-form-item>
            </a-form>
        </a-modal>
    </a-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RoleModel } from "@/api/types/System";
import api from "@/api";
import { FormInstance, message, Modal } from "ant-design-vue";
import type { Rule } from "ant-design-vue/es/form";
import { deepClone } from "@/utils/ObjectUtil";

const emit = defineEmits(["selectRole"]);

onMounted(() => {
    loadRoleData();
});

const roleData = ref<RoleModel[]>([]);
const loadingRoleData = ref(false);

function loadRoleData() {
    loadingRoleData.value = true;
    api.system
        .getRoleList()
        .then((res) => {
            roleData.value = res.data;
        })
        .finally(() => {
            loadingRoleData.value = false;
        });
}

const showEditModal = ref(false);
const editRuleModel = ref<RoleModel>({ name: "" });

const roleInfoEditForm = ref<FormInstance>();
const rules: Record<string, Rule[]> = {
    name: [{ required: true, trigger: "change", message: "请输入角色名称" }],
};

function onRefreshBtnClick() {
    loadRoleData();
}

function addNewBtnClick() {
    editRuleModel.value = { name: "" };
    showEditModal.value = true;
}
function onSaveEditClick() {
    roleInfoEditForm.value?.validate().then((res) => {
        api.system.saveRole(editRuleModel.value).then((res) => {
            if (res.data > 0) {
                showEditModal.value = false;
                loadRoleData();
            }
        });
    });
}

const selRole = ref<RoleModel>();
function onRoleItemClick(role: RoleModel) {
    if (selRole.value?.id != role.id) {
        selRole.value = role;
    } else {
        selRole.value = undefined;
    }
    emit("selectRole", selRole.value);
}

function onRoleEditClick(role: RoleModel) {
    editRuleModel.value = deepClone(role);
    showEditModal.value = true;
}

function onRoleDeleteClick(role: RoleModel) {
    Modal.confirm({
        title: "删除确认",
        content: "确定删除该角色吗？",
        onOk: () => {
            api.system.deleteRole(role.id!).then((res) => {
                if (res.data > 0) {
                    loadRoleData();
                } else {
                    message.error("操作失败" + res.msg);
                }
            });
        },
    });
}
</script>

<style lang="less" scoped>
.rolelist-container {
    display: flex;
    flex-direction: column;

    .role-extra-warp {
        & > span {
            &:not(:last-child) {
                margin-right: 8px;
            }
        }
    }

    .rolelist-item {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        padding: 12px 16px;

        &:hover {
            background-color: #f5f5f5;
            .role-action {
                visibility: visible;
            }
        }

        &[select="true"] {
            background-color: #bae7ff !important;
        }

        .antd-icon {
            &:hover {
                transform: scale(1.2);
            }
        }
    }
}
</style>
