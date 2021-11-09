// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动

import { VAxios } from "./Axios";
import { AxiosTransform } from "./AxiosTransform";
import axios, { AxiosResponse } from "axios";
import { checkStatus } from "./CheckStatus";
import { Modal, message as Message } from "ant-design-vue";
import { ResultEnum, ContentTypeEnum } from "@/enums/httpEnum";

import { Result } from "./types";

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
    /**
     * @description: 处理请求数据
     */
    transformRequestData: <T>(res: AxiosResponse<Result<T>>, resolve: (value: Result<T> | PromiseLike<Result<T>>) => void, reject: (reason?: any) => void) => {
        const resData = res.data;
        if (!resData) {
            reject(res);
        }
        const { code, data, msg } = resData;
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
        // // 请求之前处理config
        // const token = store.state.user.token;
        // if (token) {
        //     if (config.headers) {
        //         config.headers.token = token;
        //     } else {
        //         config.headers = { token: token };
        //     }
        // }
        // if (config.method?.toLocaleUpperCase() !== RequestEnum.GET) {
        //     if (config.headers?.["Content-Type"] == ContentTypeEnum.FORM_URLENCODED) {
        //         config.data = qs.stringify(config.data, { arrayFormat: "brackets" });
        //     }
        // }
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
    timeout: 15 * 1000,
    headers: { "Content-Type": ContentTypeEnum.JSON },
    // 数据处理方式
    transform,
    withCredentials: false,
});

export default Axios;
