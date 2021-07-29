
<template>
  <div class="flight-list-container">
    <!-- 筛选 -->
    <div class="flight-list-filter-warp">
      <a-row :gutter="6">
        <a-col :span="10" style="margin-left: 10px">
          <a-button @click="drwaAllArea">查看所有线路</a-button>
        </a-col>
        <a-col :span="10" style="margin-left: 10px">
          <a-button @click="hideAllArea">隐藏所有线路</a-button>
        </a-col>
      </a-row>
    </div>

    <div class="flight-list-table-warp">
      <a-table
        rowKey="id"
        size="small"
        :pagination="false"
        :dataSource="lineList"
        :customRow="lineTableCustomRow"
      >
        <a-table-column key="num" title="编号" dataIndex="num" />
        <a-table-column key="name" title="航线" dataIndex="name" />
        <a-table-column key="desc" title="航线描述" dataIndex="desc" />
      </a-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import lineData from "@/api/mock/data/lineData.json";

export default defineComponent({
  name: "LineList",
  emits: ["onItemClick", "drwaAllLine", "hideAllLine"],
  setup(prop, { emit }) {

    const lineList: Array<any> = reactive([]);
    let currentArea = reactive<Partial<any>>({});

    onMounted(() => {
      lineData.forEach((element) => {
        if(element.points){
          lineList.push(element);
        }
      });
    });

    //绘制所有区域
    function drwaAllArea() {
      currentArea.name = "";
      emit("drwaAllLine", lineList);
    }

    //隐藏所有区域
    function hideAllArea() {
      currentArea.name = "";
      emit("hideAllLine");
    }

    //目标列表数据点击
    function lineTableCustomRow(record: any, index: number) {
      return {
        onClick: () => {
          Object.assign(currentArea, record);
          emit("onItemClick", record, true);
        },
      };
    }

    return {
      lineList,
      currentArea,
      drwaAllArea,
      hideAllArea,
      lineTableCustomRow,
    };
  },
});
</script>

<style lang="less" scoped>
.flight-list-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;

  .flight-list-filter-warp {
    width: 100%;
    height: auto;
    padding: 5px 10px;
    line-height: 36px;
  }

  .flight-list-table-warp {
    width: 100%;
    height: auto;
  }
}
</style>