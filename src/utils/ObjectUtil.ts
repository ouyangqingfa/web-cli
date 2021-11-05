/**
 *
 */
class ObjectUtil {
    /**
     * 类型属性混合
     * @param first
     * @param second
     */
    public extend<T, U>(first: T, second: U): T & U {
        let result: Partial<T & U> = {};
        for (const prop in first) {
            if (Object.prototype.hasOwnProperty.call(first, prop)) {
                (result as any)[prop] = first[prop];
            }
        }
        for (const prop in second) {
            if (Object.prototype.hasOwnProperty.call(second, prop)) {
                (result as any)[prop] = second[prop];
            }
        }
        return result as T & U;
    }

    /**
     * 深拷贝
     * @param obj
     */
    public deepClone<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj));
    }

    public keyMapping<T, K extends keyof T>(arr: Array<T>, propkey: K): { [key: string]: T } {
        let result: { [key: string]: T } = {};
        arr.forEach(item => {
            let keyVal = item[propkey];
            if (typeof keyVal == "string") {
                result[keyVal] = item;
            }
        });
        return result;
        // return arr.reduce((a: { [key: string]: T }, el, i) => {
        //     let keyVal = el[propkey];
        //     a[keyVal] = el;
        //     return a;
        // }, {})
    }

    public isFunction(obj: any): boolean {
        return obj && typeof obj === "function";
    }
}
export default ObjectUtil;
