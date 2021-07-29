if (!String.prototype.isEmpty) {
    String.prototype.isEmpty = function (): boolean {
        return this == null || this == undefined || this.length == 0;
    }
}

export { }