import type { Ref } from 'vue'
import type { EChartsOption } from 'echarts';

import { unref, nextTick, onUnmounted } from "vue";
import * as echarts from "echarts";
import { ResizeObserver } from "@juggle/resize-observer";

export function useECharts(elRef: Ref<HTMLElement> | HTMLElement) {
    let chartInstance: echarts.ECharts | null = null;
    let resizer: ResizeObserver | null = null;

    function initCharts() {
        const el = unref(elRef);
        if (!el || !unref(el)) {
            return;
        }
        resizer = new ResizeObserver((entries, observer) => {
            chartInstance?.resize();
        });
        resizer.observe(el);
        chartInstance = echarts.init(el);
    }

    function setOptions(options: EChartsOption, clear = true) {
        if (unref(elRef)?.offsetHeight === 0) {
            setTimeout(() => {
                setOptions(options);
            }, 30);
            return;
        }
        nextTick(() => {
            setTimeout(() => {
                if (!chartInstance) {
                    initCharts();
                    if (!chartInstance) return;
                }
                clear && chartInstance?.clear();
                chartInstance?.setOption(options);
            }, 30);
        });
    }

    function resize() {
        chartInstance?.resize();
    }

    function clear() {
        chartInstance?.clear();
    }


    onUnmounted(() => {
        chartInstance?.clear();
        chartInstance?.dispose();
        chartInstance = null;
        let el = unref(elRef);
        if (el) {
            resizer?.unobserve(el)
        }
        resizer?.disconnect();
        resizer = null;
    })

    return {
        echarts,

        clear,
        setOptions,
        resize,
    };
}