/** 默认优先导入的类型 */
import { Method } from "axios";
import Request from "@/utils/axios";
import { Result } from "@/utils/axios/types";

export class Api {
    public url: string = "";
    public method: Method;

    constructor(url: string, method: Method = "GET") {
        this.url = url;
        this.method = method;
    }

    public do<T>(params?: any, data?: any): Promise<Result<T>> {
        return Request.request({ url: this.url, method: this.method, params: params, data: data });
    }
}
