<!-- UserList -->
<template>
    <div class="userlist-container">
        <a-list :grid="{ gutter: 16, column: 4 }" :data-source="userList" :loading="loadingData">
            <template #renderItem="{ item }">
                <a-list-item>
                    <a-card hoverable style="width: 100%">
                        <a-card-meta>
                            <template #title> {{ item.uname }} </template>
                            <template #avatar>
                                <a-avatar>
                                    <template #icon> <icon type="user" /> </template>
                                </a-avatar>
                            </template>
                            <template #description>{{ item.uid }} </template>
                        </a-card-meta>
                    </a-card>
                </a-list-item>
            </template>
        </a-list>
    </div>
</template>

<script setup lang="ts">
import { ref, onActivated, onMounted, PropType, watchEffect } from "vue";
import api from "@/api";
import { RoleModel, UserModel } from "@/api/types/System";
import { UserParams } from "@/api/modules/System";

const props = defineProps({
    role: { type: Object as PropType<RoleModel> },
});

const userList = ref<Array<UserModel>>([]);
const loadingData = ref(false);
const userSearchParam = ref<UserParams>({});

onActivated(() => {
    loadUserList();
});
// onMounted(() => {
//     loadUserList();
// });
watchEffect(() => {
    userSearchParam.value.roleId = props.role?.roleId;
    loadUserList();
});

function loadUserList() {
    loadingData.value = true;
    api.system
        .getUserList(1, 10, userSearchParam.value)
        .then((res) => {
            userList.value = res.data;
        })
        .finally(() => {
            loadingData.value = false;
        });
}
</script>

<style lang="less" scoped>
.userlist-container {
    width: 100%;
    height: 100%;
    padding: 0 16px;
}
</style>
