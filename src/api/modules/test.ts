import { Api } from "@/types";

export const TestApi = {
    getlastTime: new Api("/api/flight/getLastDataTime", "GET"),
};
export default TestApi;
