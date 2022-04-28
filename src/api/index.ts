import Request from "@/utils/axios";
import { PageResult, Result } from "@/utils/axios/types";

export function get<T>(url: string, params?: any, data?: any): Promise<Result<T>> {
    return Request.request<Result<T>>({ url: url, method: "GET", params: params, data: data });
}
export function getPage<T>(url: string, params?: any, data?: any): Promise<PageResult<T>> {
    return Request.request<PageResult<T>>({ url: url, method: "GET", params: params, data: data });
}
export function post<T>(url: string, params?: any, data?: any): Promise<Result<T>> {
    return Request.request<Result<T>>({ url: url, method: "POST", params: params, data: data });
}
export function postPage<T>(url: string, params?: any, data?: any): Promise<PageResult<T>> {
    return Request.request<PageResult<T>>({ url: url, method: "POST", params: params, data: data });
}

import TestApi from "./modules/test";
import sysApi from "./modules/System";
import userApi from "./modules/User";

export const Apis = {
    user: userApi,
    system: sysApi,
    test: TestApi,
};
export default Apis;
