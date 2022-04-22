import { App } from "vue";
import { createPinia } from "pinia";

const store = createPinia();

export { store };

export function setupPinia(app: App<Element>) {
    app.use(store);
}
