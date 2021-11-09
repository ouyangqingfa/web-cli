// import { Api } from "@/types";
// import Request from "@/utils/axios";
// import { Result } from "@/utils/axios/types";

// export function http<T>(api: Api, params?: any, data?: any): Promise<Result<T>> {
//     return Request.request({ url: api.url, method: api.method, params: params, data: data });
// }

import { TestApi } from "./modules/test";
export const Apis = {
    ...TestApi,
};
export default Apis;
