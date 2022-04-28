<!-- 用户列表 -->
<template>
    <a-card :bordered="false" title="用户列表" class="userlist-container">
        <template #extra>
            <div class="list-extra-warp">
                <icon type="redo" @click="onRefreshClick" />
                <icon type="plus" @click="onAddBtnClick" />
            </div>
        </template>
        <a-list :grid="{ gutter: 16, column: 4 }" :data-source="userList">
            <template #renderItem="{ item }">
                <a-list-item>
                    <!-- <a-card-grid style="width: 100%"> -->
                    <a-card hoverable style="width: 100%">
                        <template #actions>
                            <icon type="edit" />
                            <icon type="delete" />
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
                        <!-- <template #title>
                                {{ item.uname }}
                            </template> -->
                    </a-card>
                    <!-- </a-card-grid> -->
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
                                show-search
                                style="width: 100%"
                                v-model:value="editModel.department"
                                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                                placeholder="请选择机构"
                                tree-default-expand-all
                                :tree-data="orgTreeData"
                            ></a-tree-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="状态" name="email" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
                            <a-select style="width: 100%" :options="userStatusOptions" v-model:value="editModel.status"> </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-form-item label="角色">
                    <template v-for="role in allRoles">
                        <a-checkable-tag :checked="userRoles.indexOf(role) > -1" @change="(checked) => handleRoleChange(role, checked)">
                            {{ role }}
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
import { onMounted, PropType, ref, watch } from "vue";
import api from "@/api";
import { UserModel, OrgModel } from "@/api/types/System";
import { OrgTreeItem } from "./types";
import { FormInstance } from "ant-design-vue";
import type { SelectProps } from "ant-design-vue";
import type { Rule } from "ant-design-vue/es/form";

const props = defineProps({
    org: { type: Object as PropType<OrgModel> },
    orgTreeData: { type: Array as PropType<Array<OrgTreeItem>> },
});

onMounted(() => {
    loadUserList();
});

watch(
    () => props.org,
    () => {
        loadUserList();
    }
);

const userList = ref<Array<UserModel>>([]);
const userStatusOptions: SelectProps["options"] = [
    { label: "正常", value: 0 },
    { label: "禁用", value: -1 },
];
const allRoles = ref([]);

function loadUserList() {
    api.system.getUserList().then((res) => {
        userList.value = res.data;
    });
}

function onRefreshClick() {
    loadUserList();
}

const showEditModal = ref(false);
const editModel = ref<UserModel>({ uid: "", uname: "", status: 0 });
const userEditForm = ref<FormInstance>();
const userRoles = ref<string[]>([]);
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
    editModel.value = { uid: "", uname: "", status: 0 };
}

function onSaveEdit() {
    userEditForm.value?.validate().then(() => {
        api.system.saveUser(editModel.value).then(() => {});
    });
}

//角色选择改变
function handleRoleChange(role: any, chk: boolean) {}
</script>

<style lang="less" scoped>
.userlist-container {
    .list-extra-warp {
        & > span {
            &:not(:last-child) {
                margin-right: 8px;
            }
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
