import UserConfig from "./UserConfig";

declare global {
    interface Window {
        /**
         * 外部定义配置
         */
        APPCONFIG: UserConfig
    }

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
        // treeMap<U>(childKey: String, func: (p: T) => U): Array<U>;
        /**
         * 树形查找
         * @param childKey 
         * @param func 
         */
        treeFind<K extends keyof T>(childKey: K, func: (p: T) => boolean): T | null;

        contains(func: (p: T) => boolean): boolean;

        split(count: number): Array<Array<T>>;

        groupBy<K extends keyof T>(key: K): Array<{ key: string, items: T[] }>
    }

    interface Object {
        /**
         * 对象是否为空
         */
        // isNullOrEmpty(): boolean;
    }

    interface String {
        /**
         * 是否为空或空字符串
         */
        isEmpty(): boolean;
    }

}

declare module '@vue/runtime-core'
{
    interface ComponentCustomProperties {
        $config: OuterConfig
    }
}