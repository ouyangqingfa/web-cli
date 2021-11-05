//Antd
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";
import { App } from "vue";

export function setupAntd(app: App<Element>) {
    app.use(Antd);
}
