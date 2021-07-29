
export interface TreeModel { key: string | number; pKey: string | number; children?: Array<TreeModel>;[key: string]: any }

class TreeUtil {

    /**
     * 根据树形列表生成树形对象
     * @param data 
     * @returns 
     */
    public static buildTree(data: Array<TreeModel>): TreeModel | null {
        const keyMapping = data.reduce((acc: { [key: string]: number }, el, i) => {
            acc[el.key] = i;
            return acc;
        }, {});
        let root: TreeModel | null = null;
        data.forEach(el => {
            // 判断根节点
            if (el.pKey === null) {
                root = el;
                return;
            }
            // 用映射表找到父元素
            const parentEl = data[keyMapping[el.pKey]];
            // 把当前元素添加到父元素的`children`数组中
            parentEl.children = [...(parentEl.children || []), el];
        });
        return root;
    }


    /**
     * 获取树形结构的最大深度
     * @param tree 
     * @param childKey 
     * @returns 
     */
    public static getTreeMaxDepth<T, K extends keyof T>(tree: T, childKey: K): number {
        let depth = 1;
        if (tree) {
            let childs = tree[childKey];
            if (childs && Array.isArray(childs)) {
                let maxPath = 1;
                childs.forEach(c => {
                    let cItem = c as T;
                    if (cItem) {
                        let cDepth = this.getTreeMaxDepth(cItem, childKey);
                        maxPath = Math.max(maxPath, cDepth);
                    }
                })
                depth += maxPath;
            }
        }
        return depth;
    }



}
export default TreeUtil