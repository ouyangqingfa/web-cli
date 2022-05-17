<!-- 用户列表 -->
<template>
    <a-card :bordered="false" title="用户列表" class="userlist-container" :bodyStyle="{ flex: 1, overflowY: 'auto' }">
        <template #extra>
            <div class="list-extra-warp">
                <!-- <span>
                    <div title="搜索" class="extra-search-warp"> -->
                <icon type="search" />
                <!-- </div>
                </span> -->
                <icon type="redo" @click="onRefreshClick" />
                <icon type="plus" @click="onAddBtnClick" />
            </div>
        </template>
        <a-list :grid="{ gutter: 16, column: 4 }" :data-source="userList" :loading="loadingData" :pagination="pagination">
            <template #renderItem="{ item }">
                <a-list-item>
                    <a-card hoverable class="user-list-item-card">
                        <template #actions>
                            <icon type="edit" @click="onEditBtnClick(item)" />
                            <icon type="delete" @click="onDeleteBtnClick(item)" />
                        </template>
                        <a-card-meta>
                            <template #title> {{ item.uname }} </template>
                            <template #avatar>
                                <a-avatar>
                                    <template #icon> <icon type="user" /> </template>
                                </a-avatar>
                            </template>
                            <template #description>{{ item.uid }} </template>
                        </a-card-meta>

                        <div class="user-item-status" v-if="item.status != 1">
                            <a-tag color="#666">已禁用</a-tag>
                        </div>
                    </a-card>
                </a-list-item>
            </template>
        </a-list>
        <a-modal v-model:visible="showEditModal" title="用户信息编辑" width="800px" :maskClosable="false" @cancel="showEditModal = false" @ok="onSaveEdit">
            <a-form
                ref="userEditForm"
                :model="editModel"
                :rules="rules"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 18 }"
                autocomplete="off"
                class="user-modal-form"
            >
                <a-row>
                    <a-col :span="16">
                        <a-form-item label="登录名" name="uid" :label-col="{ span: 6 }">
                            <a-input v-model:value="editModel.uid" :maxlength="30" placeholder="请输入登录名称" />
                        </a-form-item>
                        <a-form-item label="姓名" name="uname" :label-col="{ span: 6 }">
                            <a-input v-model:value="editModel.uname" :maxlength="30" placeholder="请输入登录名称" />
                        </a-form-item>
                        <a-form-item label="密码" name="password" :label-col="{ span: 6 }" :required="editModel.id ? false : true">
                            <a-input-password
                                v-model:value="editModel.password"
                                :maxlength="30"
                                :placeholder="editModel.id ? '留空不改变登录密码' : '请输入登录密码'"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <div class="avator-warp">
                            <a-avatar :size="100">
                                <template #icon> <icon type="user" /> </template>
                            </a-avatar>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="电话" name="phone" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                            <a-input v-model:value="editModel.phone" :maxlength="30" placeholder="请输入电话号码" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="邮箱" name="email" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
                            <a-input v-model:value="editModel.email" :maxlength="30" placeholder="请输入邮箱地址" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="机构" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                            <a-tree-select
                                allow-clear
                                style="width: 100%"
                                :show-checked-strategy="SHOW_ALL"
                                v-model:value="editModel.department"
                                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                                placeholder="请选择机构"
                                tree-default-expand-all
                                :tree-data="orgTreeData"
                            ></a-tree-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="状态" name="status" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
                            <a-select style="width: 100%" :options="userStatusOptions" v-model:value="editModel.status"> </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-form-item label="角色">
                    <template v-for="role in allRoles">
                        <a-checkable-tag :checked="userRoles.exist((r) => r == role.roleId)" @change="(checked) => handleRoleChange(role, checked)">
                            {{ role.name }}
                        </a-checkable-tag>
                    </template>
                </a-form-item>
                <a-form-item label="备注">
                    <a-textarea v-model:value="editModel.remark"></a-textarea>
                </a-form-item>
            </a-form>
        </a-modal>
    </a-card>
</template>

<script setup lang="ts">
import { onActivated, onMounted, PropType, reactive, ref, watch } from "vue";
import api from "@/api";
import { UserParams } from "@/api/modules/System";
import { UserModel, OrgModel, RoleModel } from "@/api/types/System";
import { OrgTreeItem } from "./types";
import { FormInstance, message, Modal, TreeSelect } from "ant-design-vue";
import type { SelectProps } from "ant-design-vue";
import type { Rule } from "ant-design-vue/es/form";
import { deepClone } from "@/utils/ObjectUtil";
const SHOW_ALL = TreeSelect.SHOW_ALL;

const props = defineProps({
    org: { type: Object as PropType<OrgModel> },
    orgTreeData: { type: Array as PropType<Array<OrgTreeItem>> },
});

onActivated(() => {
    loadUserList();
    loadRoleData();
});
onMounted(() => {
    loadRoleData();
    loadUserList();
});

watch(
    () => props.org,
    () => {
        userSearchParam.value.orgId = props.org?.orgId;
        loadUserList();
    }
);

const userSearchParam = ref<UserParams>({});
const userList = ref<Array<UserModel>>([]);
const userStatusOptions: SelectProps["options"] = [
    { label: "正常", value: 1 },
    { label: "禁用", value: -1 },
];
const allRoles = ref<RoleModel[]>([]);
const loadingData = ref(false);

// 分页
const pagination = reactive({
    current: 1,
    pageSize: 16,
    total: 0,
    onChange: (page: number) => {
        pagination.current = page;
        loadUserList();
    },
    showSizeChanger: true,
    showTotal: (total: number) => {
        return `共${total}条记录`;
    },
    onShowSizeChange: (current: number, size: number) => {
        pagination.pageSize = size;
        loadUserList();
    },
});

function loadRoleData() {
    api.system.getRoleList().then((res) => {
        allRoles.value = res.data;
    });
}

function loadUserList() {
    loadingData.value = true;
    api.system
        .getUserList(1, 10, userSearchParam.value)
        .then((res) => {
            userList.value = res.data;
            pagination.total = res.totalSize;
        })
        .finally(() => {
            loadingData.value = false;
        });
}

function onRefreshClick() {
    loadUserList();
}

const showEditModal = ref(false);
var isCreateNewUser = true;
const editModel = ref<UserModel>({ uid: "", uname: "", status: 1 });
const userEditForm = ref<FormInstance>();
const userRoles = ref<Array<string | undefined>>([]);
const rules: Record<string, Rule[]> = {
    uid: [{ required: true, trigger: "change", message: "请输入登录名" }],
    uname: [{ required: true, message: "请输入姓名" }],
    password: [{ message: "请输入登录密码" }],
    phone: [{ pattern: /^\+?(\d(-\d)*){3,16}$/, message: "请输入正确的电话号码" }],
    email: [
        {
            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            message: "请输入格式正确的邮箱地址",
        },
    ],
};

function onAddBtnClick() {
    showEditModal.value = true;
    isCreateNewUser = true;
    editModel.value = { uid: "", uname: "", status: 1 };
    if (props.org?.orgId) {
        editModel.value.department = props.org?.orgId;
    }
    userRoles.value = [];
}

function onSaveEdit() {
    userEditForm.value?.validate().then(() => {
        editModel.value.roles = [];
        userRoles.value.forEach((role) => {
            if (role) {
                editModel.value.roles?.push(role);
            }
        });

        api.system.saveUser(isCreateNewUser, editModel.value).then((res) => {
            if (res.data === true) {
                showEditModal.value = false;
                loadUserList();
            } else {
                message.error("操作失败" + res.msg);
            }
        });
    });
}

function onEditBtnClick(user: UserModel) {
    showEditModal.value = true;
    isCreateNewUser = false;
    editModel.value = deepClone(user);
    userRoles.value = user.roles ?? [];
}

//角色选择改变
function handleRoleChange(role: RoleModel, chk: boolean) {
    if (chk) {
        userRoles.value.push(role.roleId);
    } else {
        userRoles.value.delete(role.roleId);
    }
}

//删除用户
function onDeleteBtnClick(user: UserModel) {
    Modal.confirm({
        title: "删除确认",
        content: "确定删除该用户吗？",
        onOk: () => {
            let usInfo = deepClone(user);
            usInfo.status = -1;
            api.system.saveUser(false, usInfo).then((res) => {
                if (res.data) {
                    message.success("操作成功");
                } else {
                    message.error("操作失败" + res.msg);
                }
                loadUserList();
            });
        },
    });
}
</script>

<style lang="less" scoped>
.userlist-container {
    display: flex;
    flex-direction: column;

    .list-extra-warp {
        & > span {
            &:not(:last-child) {
                margin-right: 8px;
            }
        }
    }

    .user-list-item-card {
        width: 100%;
        position: relative;

        .user-item-status {
            position: absolute;
            top: 20px;
            right: 0px;
        }
    }
}
.user-modal-form {
    .avator-warp {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 24px;
    }
}
</style>
