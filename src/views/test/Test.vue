<template>
    <div>
        测试页面A

        <div>
            <a-button type="primary" @click="onHelloBtnClick">hello</a-button>
            <div>
                {{ helloStr }}
            </div>
        </div>
        <a-table :columns="columns" :data-source="data" bordered>
            <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'name'">
                    <a>{{ record.name }} AAAA</a>
                </template>
            </template>
        </a-table>
    </div>
</template>

<script setup lang="ts">
import Apis from "@/api";
import { ref } from "vue";

const helloStr = ref("");

function onHelloBtnClick() {
    Apis.test.hello().then(res => {
        helloStr.value = res.data;
    });
}

const columns = [
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Cash Assets",
        className: "column-money",
        dataIndex: "money",
    },
    {
        title: "Address",
        dataIndex: "address",
    },
];

const data = [
    {
        key: "1",
        name: "John Brown",
        money: "￥300,000.00",
        address: "New York No. 1 Lake Park",
    },
    {
        key: "2",
        name: "Jim Green",
        money: "￥1,256,000.00",
        address: "London No. 1 Lake Park",
    },
    {
        key: "3",
        name: "Joe Black",
        money: "￥120,000.00",
        address: "Sidney No. 1 Lake Park",
    },
];
</script>

<style lang="less" scoped></style>
