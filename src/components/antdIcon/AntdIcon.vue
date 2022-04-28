<!-- AntdIcon -->
<template>
    <AntdIcon :type="iconType" :style="wrapStyle"></AntdIcon>
</template>

<script setup lang="ts">
import { computed, PropType, StyleValue } from "vue";
import { createFromIconfontCN } from "@ant-design/icons-vue";
import { isString } from "@/utils/ObjectUtil";

const AntdIcon = createFromIconfontCN({
    // scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
    // scriptUrl: '//at.alicdn.com/t/font_2184398_zflo1kjcemp.js',
    // iconfont字体图标本地化，详见：/public/iconfont.js
    scriptUrl: "/iconfont/iconfont.js",
});

const props = defineProps({
    type: {
        type: String as PropType<string>,
        default: "",
        required: true,
    },
    prefix: {
        type: String,
        default: "icon-",
    },
    color: {
        type: String as PropType<string>,
    },
    size: {
        type: [Number, String] as PropType<number | string>,
    },
});

const wrapStyle = computed(() => {
    let style: StyleValue = {};
    if (props.color) {
        style.color = props.color;
    }
    if (props.size) {
        const size = props.size;
        style.fontSize = isString(size) ? (size.endsWith("px") ? size : parseFloat(size) + "px") : size + "px";
    }
    return style;
});
const iconType = computed(() => {
    return props.prefix + (props.type || "");
});
</script>

<style lang="less" scoped></style>
