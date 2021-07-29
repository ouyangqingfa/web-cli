<!--Echarts 组件-->
<template>
  <div :id="chartId" class="echarts-base-container"></div>
</template>

<script lang="ts">
import * as echarts from "echarts";
import { defineComponent, ref, onMounted, nextTick, onUnmounted } from "vue";
import { ResizeObserver } from "@juggle/resize-observer";

import { getUUID2 } from "@/utils/Utils";

export default defineComponent({
  name: "index",
  setup() {
    const chartId = "echarts_" + getUUID2(6);
    let echart: echarts.ECharts | null = null;
    let resizer: ResizeObserver | null = null;

    onMounted(() => {
      nextTick(() => {
        let docel = document.getElementById(
          "flowChartContainer"
        ) as HTMLElement;
        if (docel) {
          //init echarts
          echart = echarts.init(docel);
          //init resizer
          resizer = new ResizeObserver((entries, observer) => {
            // observer.disconnect();
            echart?.resize();
          });
          resizer.observe(docel);
        } else {
          console.error("echarts init error => HTMLElement is null");
        }
      });
    });
    onUnmounted(() => {
      resizer?.disconnect();
      echart?.clear();
      echart?.dispose();
    });

    return { chartId };
  },
});
</script>

<style lang="less" scoped>
.echarts-base-container {
  min-width: 10px;
  height: 10px;
}
</style>