import { get, post, getPage, postPage } from "../";

export const TestApi = {
  hello: () => get<string>("/api/dev/hello"),
};
export default TestApi;
