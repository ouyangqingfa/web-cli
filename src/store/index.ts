import { reactive } from "vue";

// export class Store {
//     private _modules = new Map<string, any>();

//     public setupModule(module: { new (): any }): void {
//         const key = module.name;
//         this._modules.set(key, reactive(new module()));
//     }

//     public get<T>(storeType: { new (): T }): T {
//         const key = storeType.name;
//         const storeModule = this._modules.get(key);
//         if (storeModule) {
//             return storeModule as T;
//         } else {
//             throw new Error("don't has store module " + key);
//         }
//     }
// }

// const store = new Store();

// /** 自动导入modules文件夹下所有的类作为store */
export function setupStore() {
    //     const allModules = import.meta.globEager("./modules/*.ts");
    //     Object.keys(allModules).forEach(path => {
    //         let fileName = path.split("/")[2];
    //         let module = allModules[path][fileName] || allModules[path].default || allModules[path];
    //         if (module) {
    //             store.setupModule(module);
    //         } else {
    //             console.error("setup store has not default export");
    //         }
    //     });
}

import { UserStore } from "./modules/UserStore";
import { RouterStore } from "./modules/RouterStore";

const store = {
    userStore: reactive(new UserStore()),
    routerStore: reactive(new RouterStore()),
};

export default store;
