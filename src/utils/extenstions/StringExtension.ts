declare global {
    interface String {
        /**
         * 是否为空或空字符串
         */
        isEmpty(): boolean;
    }
}

if (!String.prototype.isEmpty) {
    String.prototype.isEmpty = function (): boolean {
        return this == null || this == undefined || this.length == 0;
    };
}

export {};
