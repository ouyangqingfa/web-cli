//Antd
import { App } from "vue";
import "xe-utils";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";

export function setupVxeTable(app: App<Element>) {
  app.use(VXETable);
}
