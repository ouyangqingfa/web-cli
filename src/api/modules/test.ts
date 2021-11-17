import { get, post, getPage, postPage } from "../";

export const TestApi = {
    hello: () => get<string>("/api/system/test/hello"),
};
export default TestApi;
