/**
 * 数据处理类，可以根据项目自行配置
 */
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { Result } from "./types";

export abstract class AxiosTransform {
    /**
     * @description: 请求之前处理配置
     * @description: Process configuration before request
     */
    beforeRequestHook?: (config: AxiosRequestConfig) => AxiosRequestConfig;

    /**
     * @description: 请求成功数据处理
     */
    transformRequestData?: <T>(
        res: AxiosResponse<Result<T>>,
        resolve: (value: Result<T> | PromiseLike<Result<T>>) => void,
        reject: (reason?: any) => void
    ) => void;

    /**
     * @description: 请求失败处理
     */
    requestCatch?: (e: Error) => Promise<any>;

    /**
     * @description: 请求之前的拦截器
     */
    requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;

    /**
     * @description: 请求之后的拦截器
     */
    responseInterceptors?: <T>(res: AxiosResponse<T>) => AxiosResponse<T>;

    /**
     * @description: 请求之前的拦截器错误处理
     */
    requestInterceptorsCatch?: (error: Error) => void;

    /**
     * @description: 请求之后的拦截器错误处理
     */
    responseInterceptorsCatch?: (error: Error) => void;
}
