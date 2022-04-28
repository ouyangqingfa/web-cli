import { get, post, getPage, postPage } from "../";

const TestApi = {
    hello: () => get<string>("/api/dev/hello"),
};
export default TestApi;
