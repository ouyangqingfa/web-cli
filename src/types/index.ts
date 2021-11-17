/** 默认优先导入的类型 */
import { Method } from "axios";
import Request from "@/utils/axios";
import { PageResult, Result } from "@/utils/axios/types";

export class Api<T> {
    public url: string = "";
    public method: Method;

    constructor(url: string, method: Method = "GET") {
        this.url = url;
        this.method = method;
    }

    public do(params?: any, data?: any): Promise<Result<T>> {
        return Request.request<Result<T>>({ url: this.url, method: this.method, params: params, data: data });
    }

    public page(params?: any, data?: any): Promise<PageResult<T>> {
        return Request.request<PageResult<T>>({ url: this.url, method: this.method, params: params, data: data });
    }
}
