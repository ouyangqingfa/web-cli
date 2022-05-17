import mitt from "./Emitter";

/**
 * 若需利用TS的自动提示，在此处定义事件
 * key:事件名称
 * val:事件触发参数
 */
export type Events = {
    test: undefined;
};

const emitter = mitt<Events>();

export default emitter;
