import { defineComponent, PropType, unref, computed } from "vue";
import { createFromIconfontCN } from "@ant-design/icons-vue";
import { isString } from "@/utils/ObjectUtil";

let AntdIcon = createFromIconfontCN({
    // scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
    // scriptUrl: '//at.alicdn.com/t/font_2184398_zflo1kjcemp.js',
    // iconfont字体图标本地化，详见：/public/iconfont.js
    scriptUrl: "",
});

export default defineComponent({
    name: "AntdIcon",
    props: {
        type: {
            type: String as PropType<string>,
            default: "",
        },
        color: {
            type: String as PropType<string>,
            default: "unset",
        },
        size: {
            type: [Number, String] as PropType<number | string>,
            default: 14,
        },
        scriptUrl: {
            type: String as PropType<string>,
            default: "",
        },
    },
    setup(props, { attrs }) {
        if (props.scriptUrl) {
            AntdIcon = createFromIconfontCN({ scriptUrl: props.scriptUrl });
        }

        const wrapStyleRef = computed(() => {
            const { color, size } = props;
            const fs = isString(size) ? parseFloat(size) : size;
            return { color, fontSize: `${fs}px` };
        });

        return () => <AntdIcon type={props.type || ""} {...attrs} style={unref(wrapStyleRef)} />;
    },
});
