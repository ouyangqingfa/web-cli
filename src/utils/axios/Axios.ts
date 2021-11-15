import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";

import axios from "axios";
import { AxiosCanceler } from "./AxiosCancel";

import type { CreateAxiosOptions, Result } from "./types";
import { RequestEnum } from "@/enums/HttpEnum";

export * from "./AxiosTransform";

/**
 * @description:  axios模块
 */
export class VAxios {
    private axiosInstance: AxiosInstance;
    private options: CreateAxiosOptions;

    constructor(options: CreateAxiosOptions) {
        this.options = options;
        this.axiosInstance = axios.create(options);
        this.setupInterceptors();
    }

    /**
     * @description:  创建axios实例
     */
    private createAxios(config: CreateAxiosOptions): void {
        this.axiosInstance = axios.create(config);
    }

    private getTransform() {
        const { transform } = this.options;
        return transform;
    }

    getAxios(): AxiosInstance {
        return this.axiosInstance;
    }

    /**
     * @description: 重新配置axios
     */
    configAxios(config: CreateAxiosOptions) {
        if (!this.axiosInstance) {
            return;
        }
        this.createAxios(config);
    }

    /**
     * @description: 设置通用header
     */
    setHeader(headers: any): void {
        if (!this.axiosInstance) {
            return;
        }
        Object.assign(this.axiosInstance.defaults.headers, headers);
    }

    /**
     * @description: 拦截器配置
     */
    private setupInterceptors() {
        const transform = this.getTransform();
        if (!transform) {
            return;
        }
        const { requestInterceptors, requestInterceptorsCatch, responseInterceptors, responseInterceptorsCatch } = transform;

        const axiosCanceler = new AxiosCanceler();

        // 请求拦截器配置处理
        this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
            const { headers: { ignoreCancelToken } = { ignoreCancelToken: false } } = config;
            !ignoreCancelToken && axiosCanceler.addPending(config);
            if (requestInterceptors) {
                config = requestInterceptors(config);
            }
            return config;
        }, undefined);

        // 请求拦截器错误捕获
        requestInterceptorsCatch && this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

        // 响应结果拦截器处理
        this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
            res && axiosCanceler.removePending(res.config);
            if (responseInterceptors) {
                res = responseInterceptors(res);
            }
            return res;
        }, undefined);

        // 响应结果拦截器错误捕获
        responseInterceptorsCatch && this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch);
    }

    /**
     * @description:   请求方法
     */
    request<T extends Result<any>>(config: AxiosRequestConfig): Promise<T> {
        const transform = this.getTransform();
        const { beforeRequestHook, requestCatch, transformRequestData } = transform || {};
        if (beforeRequestHook) {
            config = beforeRequestHook(config);
        }
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .request<T>(config)
                .then((res: AxiosResponse<T>) => {
                    const isCancel = axios.isCancel(res);
                    if (transformRequestData && !isCancel) {
                        transformRequestData<T>(res, resolve, reject);
                    } else {
                        resolve(res.data);
                    }
                })
                .catch((e: Error) => {
                    if (requestCatch) {
                        reject(requestCatch(e));
                        return;
                    }
                    reject(e);
                });
        });
    }

    get<T extends Result<any>>(url: string, params?: any): Promise<T> {
        return this.request({ url: url, method: RequestEnum.GET, params: params });
    }

    post<T extends Result<any>>(url: string, data: any, params?: any): Promise<T> {
        return this.request({ url: url, method: RequestEnum.POST, data: data, params: params });
    }
}
