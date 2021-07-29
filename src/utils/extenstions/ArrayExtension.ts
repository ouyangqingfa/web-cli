if (!Array.prototype.isEmpty) {
    Array.prototype.isEmpty = function (): boolean {
        return this == null || this == undefined || this.length == 0;
    }
}

if (!Array.prototype.remove) {
    Array.prototype.remove = function <T>(func: (p: T) => boolean): Array<T> {
        for (let i = 0; i < this.length; i++) {
            if (func(this[i]) === true) {
                this.splice(i, 1);
                break;
            }
        }
        return this
    }
}

if (!Array.prototype.removeAll) {
    Array.prototype.removeAll = function <T>(func: (p: T) => boolean): Array<T> {
        let temp = new Array<T>();
        this.forEach(e => {
            if (func(e) == false) {
                temp.push(e);
            }
        });
        return temp;
    }
}



if (!Array.prototype.findCount) {
    Array.prototype.findCount = function <T>(func: (p: T) => boolean, count: number): Array<T> {
        let temp = new Array<T>();
        for (let i = 0; i < this.length; i++) {
            if (func(this[i]) === true) {
                temp.push(this[i])
            }
            if (temp.length >= count) {
                return temp;
            }
        }
        return temp;
    }
}

if (!Array.prototype.findAll) {
    Array.prototype.findAll = function <T>(func: (p: T) => boolean): Array<T> {
        let temp = new Array<T>();
        this.forEach(e => {
            if (func(e) == true) {
                temp.push(e);
            }
        });
        return temp;
    }
}

if (!Array.prototype.treeFind) {
    Array.prototype.treeFind = function <T, K extends keyof T>(childKey: K, func: (p: T) => boolean): T | null {
        let result: T | null = null;
        for (let i = 0; i < this.length; i++) {
            let item = this[i];
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
    }
}

if (!Array.prototype.clear) {
    Array.prototype.clear = function (): void {
        this.length = 0;
    }
}

if (!Array.prototype.contains) {
    Array.prototype.contains = function <T>(func: (p: T) => boolean): boolean {
        for (let i = 0; i < this.length; i++) {
            if (func(this[i]) == true) {
                return true;
            }
        }
        return false;
    }
}

if (!Array.prototype.split) {
    Array.prototype.split = function <T>(count: number): Array<Array<T>> {
        let len = Math.ceil(this.length / count);
        let result: Array<Array<T>> = [];
        for (let i = 0; i < this.length; i += len) {
            result.push(this.slice(i, i + len));
        }
        return result;
    }
}

if (!Array.prototype.groupBy) {
    Array.prototype.groupBy = function <T, K extends keyof T>(key: K): Array<{ key: string, items: T[] }> {
        let groups: { [key: string]: T[] } = {};
        this.forEach(item => {
            let groupKey = item[key];
            groups[groupKey] = groups[groupKey] || [];
            groups[groupKey].push(item);
        });
        return Object.keys(groups).map(g => {
            return { key: g, items: groups[g] };
        });
    }

}

export { }