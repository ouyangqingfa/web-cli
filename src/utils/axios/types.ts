import { AxiosRequestConfig } from "axios";
import { AxiosTransform } from "./AxiosTransform";

export interface CreateAxiosOptions extends AxiosRequestConfig {
    prefixUrl?: string;
    transform?: AxiosTransform;
}

/**
 * 数据结果
 */
export interface Result<T extends any> {
    code: number;
    msg: string;
    data: T;
}
/**
 * 分页数据结果
 */
export interface PageResult<T extends any> extends Result<Array<T>> {
    code: number;
    msg: string;
    totalSize: number;
    pageSize: number;
    pageCount: number;
    pageIndex?: number;
    data: Array<T>;
}
