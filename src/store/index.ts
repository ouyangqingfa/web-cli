import { reactive } from "vue";

export class Store {
    private _modules = new Map<string, any>();

    public setupModule(key: string, module: any): void {
        this._modules.set(key, reactive(module));
    }

    public get<T>(key: string): T {
        return this._modules.get(key) as T;
    }
}

const store = new Store();

export function setupStore() {
    const allModules = import.meta.globEager("./modules/*.ts");
    Object.keys(allModules).forEach(path => {
        const fileName = path.split("/")[2];
        let module = allModules[path][fileName] || allModules[path].default || allModules[path];
        if (module) {
            let key = module.SKEY || fileName;
            if (key) {
                store.setupModule(key, new module());
            } else {
                console.error("setup store not has key");
            }
        } else {
            console.error("setup store has not default export");
        }
    });
}

export default store;
