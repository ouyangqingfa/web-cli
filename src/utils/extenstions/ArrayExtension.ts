declare global {
    /**
     * 扩展数组
     */
    interface Array<T> {
        /**
         * 是否为空
         */
        isEmpty(): boolean;
        /**
         * 清空数据
         */
        clear(): void;
        delete(item: T): boolean;
        /**
         * 移除指定项
         * @param func
         */
        remove(func: (p: T) => boolean): Array<T>;
        /**
         * 移除所有匹配项
         * @param func
         */
        removeAll(func: (p: T) => boolean): Array<T>;
        exist(func: (p: T) => boolean): boolean;
        // /**
        //  * 查找指定项
        //  * @param func
        //  */
        // find(func: (p: T) => boolean): T;
        /**
         * 从源数组中查找指定条数满足条件的数据
         * @param func
         * @param count
         */
        findCount(func: (p: T) => boolean, count: number): Array<T>;
        /**
         * 查找所有匹配项
         * @param func
         */
        findAll(func: (p: T) => boolean): Array<T>;
        // /**
        //  * 树形结构转换
        //  * @param childKey
        //  * @param func
        //  */
        mapTree<U extends { [key: string]: any }, K extends keyof T, CK extends keyof U>(
            key: K,
            pKey: K,
            trans: (item: T) => U,
            childKey?: CK | "children"
        ): Array<U>;
        /**
         * 树形查找
         * @param childKey
         * @param func
         */
        treeFind<K extends keyof T>(childKey: K, func: (p: T) => boolean): T | null;

        treeCall<K extends keyof T>(childKey: K, func: (item: T, p?: T) => void, parent?: T): void;

        contains(func: (p: T) => boolean): boolean;

        split(count: number): Array<Array<T>>;

        groupBy<K extends keyof T>(key: K): Array<{ key: string; items: T[] }>;

        all(func: (p: T) => boolean): boolean;
        any(func: (p: T) => boolean): boolean;
        count(func: (p: T) => boolean): number;
        first(): T | null;
        last(): T | null;
    }
}

if (!Array.prototype.isEmpty) {
    Array.prototype.isEmpty = function (): boolean {
        return this == null || this == undefined || this.length == 0;
    };
}

if (!Array.prototype.delete) {
    Array.prototype.delete = function <T>(item: T): boolean {
        for (let i = 0; i < this.length; i++) {
            if (this[i] == item) {
                this.splice(i, 1);
                return true;
            }
        }
        return false;
    };
}

if (!Array.prototype.remove) {
    Array.prototype.remove = function <T>(func: (p: T) => boolean): Array<T> {
        for (let i = 0; i < this.length; i++) {
            if (func(this[i]) === true) {
                this.splice(i, 1);
                break;
            }
        }
        return this;
    };
}

if (!Array.prototype.removeAll) {
    Array.prototype.removeAll = function <T>(func: (p: T) => boolean): Array<T> {
        const temp = new Array<T>();
        this.forEach((e) => {
            if (func(e) == false) {
                temp.push(e);
            }
        });
        return temp;
    };
}

if (!Array.prototype.exist) {
    Array.prototype.exist = function <T>(func: (p: T) => boolean): boolean {
        for (let i = 0; i < this.length; i++) {
            if (func(this[i]) === true) {
                return true;
            }
        }
        return false;
    };
}

if (!Array.prototype.findCount) {
    Array.prototype.findCount = function <T>(func: (p: T) => boolean, count: number): Array<T> {
        const temp = new Array<T>();
        for (let i = 0; i < this.length; i++) {
            if (func(this[i]) === true) {
                temp.push(this[i]);
            }
            if (temp.length >= count) {
                return temp;
            }
        }
        return temp;
    };
}

if (!Array.prototype.findAll) {
    Array.prototype.findAll = function <T>(func: (p: T) => boolean): Array<T> {
        const temp = new Array<T>();
        this.forEach((e) => {
            if (func(e) == true) {
                temp.push(e);
            }
        });
        return temp;
    };
}

if (!Array.prototype.mapTree) {
    Array.prototype.mapTree = function <T, U extends { [key: string]: any }, K extends keyof T, CK extends keyof U>(
        key: K,
        pKey: K,
        trans: (item: T) => U,
        childKey?: CK | "children"
    ): Array<U> {
        childKey = childKey ?? "children";
        let data = this;
        var res: U[] = [];
        var temp: { [key: string]: any } = {};
        var resTemp: { [key: string]: any } = {};
        for (var i = 0; i < data.length; i++) {
            temp[data[i][key]] = data[i];
            resTemp[data[i][key]] = trans(data[i]);
        }
        for (var k = 0; k < data.length; k++) {
            const item = data[k];
            if (temp[item[pKey]] && item[key] !== item[pKey]) {
                if (!resTemp[item[pKey]][childKey]) {
                    resTemp[item[pKey]][childKey] = [];
                }
                resTemp[item[pKey]][childKey].push(resTemp[item[key]]);
            } else {
                res.push(resTemp[item[key]]);
            }
        }
        return res;
    };
}

if (!Array.prototype.treeFind) {
    Array.prototype.treeFind = function <T, K extends keyof T>(childKey: K, func: (p: T) => boolean): T | null {
        let result: T | null = null;
        for (let i = 0; i < this.length; i++) {
            const item = this[i];
            if (func(item) == true) {
                result = item;
                break;
            } else if (item[childKey] && Array.isArray(item[childKey]) === true) {
                result = item[childKey].treeFind(childKey, func);
                if (result) {
                    break;
                }
            }
        }
        return result;
    };
}

if (!Array.prototype.treeCall) {
    Array.prototype.treeCall = function <T, K extends keyof T>(childKey: K, func: (item: T, p?: T) => void, parent?: T): void {
        for (let i = 0; i < this.length; i++) {
            const item = this[i];
            func(item, parent);
            if (item[childKey] && Array.isArray(item[childKey]) === true) {
                item[childKey].treeCall(childKey, func, item);
            }
        }
    };
}

if (!Array.prototype.clear) {
    Array.prototype.clear = function (): void {
        this.length = 0;
    };
}

if (!Array.prototype.contains) {
    Array.prototype.contains = function <T>(func: (p: T) => boolean): boolean {
        for (let i = 0; i < this.length; i++) {
            if (func(this[i]) == true) {
                return true;
            }
        }
        return false;
    };
}

if (!Array.prototype.split) {
    Array.prototype.split = function <T>(count: number): Array<Array<T>> {
        const len = Math.ceil(this.length / count);
        const result: Array<Array<T>> = [];
        for (let i = 0; i < this.length; i += len) {
            result.push(this.slice(i, i + len));
        }
        return result;
    };
}

if (!Array.prototype.groupBy) {
    Array.prototype.groupBy = function <T, K extends keyof T>(key: K): Array<{ key: string; items: T[] }> {
        const groups: { [key: string]: T[] } = {};
        this.forEach((item) => {
            const groupKey = item[key];
            groups[groupKey] = groups[groupKey] || [];
            groups[groupKey].push(item);
        });
        return Object.keys(groups).map((g) => {
            return { key: g, items: groups[g] };
        });
    };
}

if (!Array.prototype.all) {
    Array.prototype.all = function <T>(func: (item: T) => boolean): boolean {
        let result = true;
        for (let i = 0; i < this.length; i++) {
            result = result || func(this[i]);
        }
        return result;
    };
}
if (!Array.prototype.any) {
    Array.prototype.any = function <T>(func: (item: T) => boolean): boolean {
        for (let i = 0; i < this.length; i++) {
            if (func(this[i]) === true) {
                return true;
            }
        }
        return false;
    };
}
if (!Array.prototype.count) {
    Array.prototype.count = function <T>(func: (item: T) => boolean): number {
        let result = 0;
        for (let i = 0; i < this.length; i++) {
            result += func(this[i]) == true ? 1 : 0;
        }
        return result;
    };
}
if (!Array.prototype.first) {
    Array.prototype.first = function <T>(): T | null {
        return this.length > 0 ? this[0] : null;
    };
}
if (!Array.prototype.last) {
    Array.prototype.last = function <T>(): T | null {
        return this.length > 0 ? this[this.length - 1] : null;
    };
}

export {};
