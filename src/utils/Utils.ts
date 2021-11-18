export function getUUID(): string {
    return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`
        .replace(/[xy]/g, function (c) {
            let r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        })
        .toUpperCase();
}

export function getUUID2(len: number = 16, radix: number = 16): string {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    var uuid: string[] = [];
    radix = radix || chars.length;
    for (let i = 0; i < len; i++) {
        uuid[i] = chars[0 | (Math.random() * radix)];
    }
    return uuid.join("");
}
