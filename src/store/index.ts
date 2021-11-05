import { App, reactive } from "vue";
import { UserStore } from "./modules/User";

export class Store {
    private _modules = new Map<string, any>();

    public setupModule(key: string, module: any): void {
        this._modules.set(key, reactive(module));
    }

    public get<T>(key: string): T {
        return this._modules.get(key) as T;
    }
}

// //自动导包
// const allModules = import.meta.globEager("./modules/*.ts");
const store = new Store();
// Object.keys(allModules).forEach(path => {
//     // const fileName = path.split("/")[1];
//     // modules[fileName] = allModules[path][fileName] || allModules[path].default || allModules[path];
//     debugger;
// });

// export function setupStore(app: App) {
// app.use(store);
// }

store.setupModule(UserStore.SKEY, new UserStore());

export default store;
