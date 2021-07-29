export default class ColorUtil {

    public static hexToRgb(sColor: string): [number, number, number] {
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        var sColor: string = sColor.toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                var sColorNew = "#";
                for (var i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值 
            return [
                parseInt("0x" + sColor.slice(1, 3)),
                parseInt("0x" + sColor.slice(3, 5)),
                parseInt("0x" + sColor.slice(5, 7))
            ];
        } else {
            return [0, 0, 0];
        }
    }

    public static rgbToHex(rgb: string): string {
        function hex(x: string) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        var reg = /(\d{1,3}),(\d{1,3}),(\d{1,3})/;
        var arr = reg.exec(rgb);
        if (arr != null) {
            var _hex = "#" + hex(arr[1]) + hex(arr[2]) + hex(arr[3]);
            return _hex.toUpperCase();
        } else {
            return "#000000";
        }
    }

    public static gradientColor(startColor: string, endColor: string, step: number) {
        let startRGB = this.hexToRgb(startColor);//转换为rgb数组模式
        let startR = startRGB[0];
        let startG = startRGB[1];
        let startB = startRGB[2];

        let endRGB = this.hexToRgb(endColor);
        let endR = endRGB[0];
        let endG = endRGB[1];
        let endB = endRGB[2];

        let sR = (endR - startR) / step;//总差值
        let sG = (endG - startG) / step;
        let sB = (endB - startB) / step;

        var colorArr = [];
        for (var i = 0; i < step; i++) {
            //计算每一步的hex值 
            var hex = this.rgbToHex('rgb(' + (sR * i + startR).toFixed(0) + ',' + (sG * i + startG).toFixed(0) + ',' + (sB * i + startB).toFixed(0) + ')');
            colorArr.push(hex);
        }
        return colorArr;
    }

}