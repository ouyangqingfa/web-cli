// axios配置
import { VAxios } from "./Axios";
import { AxiosTransform } from "./AxiosTransform";
import axios, { AxiosResponse } from "axios";
import { checkStatus } from "./CheckStatus";
import { Modal, message as Message } from "ant-design-vue";
import { ResultEnum, ContentTypeEnum } from "@/enums/httpEnum";
import { Result } from "./types";
import store from "@/store";

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
    /**
     * @description: 处理请求数据
     */
    transformRequestData: <T extends Result<any>>(res: AxiosResponse<T>, resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => {
        const resData = res.data;
        if (!resData) {
            reject(res);
        }
        const { code, msg } = resData;
        if (code === ResultEnum.SUCCESS) {
            resolve(resData);
        } else {
            if (msg) {
                Message.error(msg);
                reject(msg);
            } else {
                const msg = "操作失败!";
                Message.error(msg);
                reject(msg);
            }
        }
        resolve(resData);
    },

    // // 请求之前处理config
    // beforeRequestHook: (config, options) => {
    //     return config;
    // },

    /**
     * @description: 请求拦截器处理
     */
    requestInterceptors: config => {
        // 请求之前处理config
        const token = store.userStore.token;
        if (token) {
            if (config.headers) {
                config.headers.Authorization = token;
            } else {
                config.headers = { Authorization: token };
            }
        }
        return config;
    },

    /**
     * @description: 响应错误处理
     */
    responseInterceptorsCatch: (error: any) => {
        const { response, code, message } = error || {};
        const msg: string = response && response.data && response.data.error ? response.data.error.message : "";
        const err: string = error.toString();
        try {
            if (code === "ECONNABORTED" && message.indexOf("timeout") !== -1) {
                Message.error("接口请求超时,请刷新页面重试!");
                return;
            }
            if (err && err.includes("Network Error")) {
                Modal.confirm({
                    title: "网络异常",
                    content: "请检查您的网络连接是否正常!",
                });
                return;
            }
        } catch (error) {
            throw error;
        }
        // 请求是否被取消
        const isCancel = axios.isCancel(error);
        if (!isCancel) {
            checkStatus(error.response && error.response.status, msg);
        } else {
            console.warn(error, "请求被取消！");
        }
        return error;
    },
};

const Axios = new VAxios({
    timeout: 60 * 1000,
    headers: { "Content-Type": ContentTypeEnum.JSON },
    // 数据处理方式
    transform,
    withCredentials: false,
});

export default Axios;
