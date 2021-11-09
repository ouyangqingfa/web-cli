/**
 * 地图工具类
 * 可用库：Turf.js https://turfjs.fenxianglu.cn/category/
 */
// class GisUtil {
/**
 * 获取区域内经纬度的极值
 * @param {*} points 一系列经纬度点 [[lon1,lat1],[lon2,lat2]]
 */
export function getAreaPole(points: Array<Array<number>>): Array<number> {
    if (points && points.length > 0) {
        let minlon = points[0][0];
        let maxlon = points[0][0];
        let minlat = points[0][1];
        let maxlat = points[0][1];

        points.forEach(point => {
            minlon = Math.min(minlon, point[0]);
            maxlon = Math.max(maxlon, point[0]);
            minlat = Math.min(minlat, point[1]);
            maxlat = Math.max(maxlat, point[1]);
        });
        return [minlon, minlat, maxlon, maxlat];
    } else {
        return [];
    }
}

/**
 * 获取区域的中心点
 * @param {*} points 一系列经纬度点 [[lon1,lat1],[lon2,lat2]]
 */
export function getAreaCenter(points: Array<Array<number>>): Array<number> {
    let poles = getAreaPole(points);
    if (poles.length > 0) {
        return [(poles[0] + poles[2]) / 2, (poles[1] + poles[3]) / 2];
    } else {
        return [0, 0];
    }
}

/**
 * 获取区域的缩放级别
 * @param {*} points 一系列经纬度点 [[lon1,lat1],[lon2,lat2]]
 */
export function getAreaZoom(points: Array<Array<number>>): number {
    let poles = getAreaPole(points);
    if (poles.length > 0) {
        return getZoom(poles[0], poles[1], poles[2], poles[3]);
    } else {
        return 0;
    }
}

/**
 * 获取区域的中心点及缩放级别
 * @param {*} points 一系列经纬度点 [[lon1,lat1],[lon2,lat2]]
 */
export function getAreaCenterAndZoom(points: Array<Array<number>>): Array<any> {
    let poles = getAreaPole(points);
    if (poles.length > 0) {
        return [[(poles[0] + poles[2]) / 2, (poles[1] + poles[3]) / 2], getZoom(poles[0], poles[1], poles[2], poles[3])];
    } else {
        return [[0, 0], 0];
    }
}

/**
 * 计算两经纬度之间的距离，单位是m
 * @param {*} lon1 第一个点的经度
 * @param {*} lat1 第一个点的纬度
 * @param {*} lon2 第二个点的经度
 * @param {*} lat2 第二个点的纬度
 */
export function getDistance(lon1: number, lat1: number, lon2: number, lat2: number): number {
    const PI = Math.PI;
    const EARTH_RADIUS = 6378137.0;
    function getRad(d: number) {
        return (d * PI) / 180.0;
    }
    let f = getRad((lat1 + lat2) / 2);
    let g = getRad((lat1 - lat2) / 2);
    let l = getRad((lon1 - lon2) / 2);
    let sg = Math.sin(g);
    let sl = Math.sin(l);
    let sf = Math.sin(f);

    let s, c, w, r, d, h1, h2;
    let a = EARTH_RADIUS;
    let fl = 1 / 298.257;

    sg = sg * sg;
    sl = sl * sl;
    sf = sf * sf;

    s = sg * (1 - sl) + (1 - sf) * sl;
    c = (1 - sg) * (1 - sl) + sf * sl;

    w = Math.atan(Math.sqrt(s / c));
    r = Math.sqrt(s * c) / w;
    d = 2 * w * a;
    h1 = (3 * r - 1) / 2 / c;
    h2 = (3 * r + 1) / 2 / s;

    return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
}

/**
 * 根据两个点计算到合适的缩放级别
 * @param {*} minlon 区域内最小经度
 * @param {*} minlat 区域内最小纬度
 * @param {*} maxlon 区域内最大经度
 * @param {*} maxlat 区域内最大纬度
 */
export function getZoom(minlon: number, minlat: number, maxlon: number, maxlat: number): number {
    let distance = getDistance(minlon, minlat, maxlon, maxlat);
    return getZoomByDistance(distance);
}

/**
 * 根据距离获取合适的缩放级别
 * @param distance
 * @returns
 */
export function getZoomByDistance(distance: number): number {
    let zooms = [20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 25000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000]; //级别18到3。
    for (let i = 0, zoomLen = zooms.length; i < zoomLen; i++) {
        if (zooms[i] - distance > 0) {
            return Math.max(0, Math.min(18, 18 - i + 4));
        }
    }
    return 0;
}

/**
 * 对mapbox航线的轨迹点进行处理，使连续
 * @param coordinates
 */
export function handleMapboxCoords(coordinates: number[][]): void {
    var lstLonDiff = [];
    for (var i = 0; i < coordinates.length - 1; i++) {
        var detLon = coordinates[i + 1][0] - coordinates[i][0];
        //如果超过180度
        if (Math.abs(detLon) > 180) {
            if (detLon > 0) {
                detLon -= 360;
            } else {
                detLon += 360;
            }
        }
        lstLonDiff.push(detLon);
    }
    //如果起始点是负半球，整体向右移动360度,如果是正半球，就保持不动
    if (coordinates[0][0] < 0) coordinates[0][0] += 360;
    for (var i = 0; i < coordinates.length - 1; i++) {
        //从上一个点上加上经差，把航线内存数据，重新赋值
        coordinates[i + 1][0] = coordinates[i][0] + lstLonDiff[i];
    }
}

/**
 * 获取地理上角度所对应的字符方位
 * @param angle
 */
export function getAngleStr(angle: number): string {
    let str = "";
    if (!Number.isNaN(angle)) {
        angle = angle < 0 ? 0 : angle >= 359 ? 360 : angle; //处理不正常的角度及把359转成360方便计算
        let arr = ["正北", "东北", "正东", "东南", "正南", "西南", "正西", "西北"];
        let num = angle / 45; //每45度为一个正方向
        //如果是整数表示为八个正方向
        if (Number.isInteger(num)) {
            str = arr[num] || arr[0];
        } else {
            //非八个正方向
            let direction = "";
            if (num > 7 || num < 1) {
                direction = "北"; //偏北
            } else if (num > 1 && num < 3) {
                direction = "东"; //偏东
            } else if (num > 3 && num < 5) {
                direction = "南"; //偏南
            } else if (num > 5 && num < 7) {
                direction = "西"; //偏西
            }
            let slantAngle = Math.round(angle - 90 * Math.round(angle / 90)) + "°"; //偏角值(正角或负角)
            str = "偏" + direction + slantAngle;
        }
    }
    return str;
}

/**
 * 处理不正常的角度
 * @param angle
 * @returns
 */
export function roundAngle(angle: number): number {
    return Math.max(0, Math.min(Math.abs(angle), 360));
}

/**
 * 处理mapbox的视图边界的经纬度问题
 */
export function getMapboxPole(lon1: number, lon2: number, lat1: number, lat2: number): [number, number, number, number] {
    function handleLon(lon: number): number {
        lon = lon < -180 ? lon + 360 : lon;
        lon = lon > 180 ? lon - 360 : lon;
        return lon;
    }
    lon1 = handleLon(lon1);
    lon2 = handleLon(lon2);
    return [Math.min(lon1, lon2), Math.max(lon1, lon2), Math.min(lat1, lat2), Math.max(lat1, lat2)];
}

/**
 * 经纬度转换
 */
export function ddd2dms() {}

// public static buildSimpleSource<T, K1 extends keyof T, K2 extends keyof T>(points: T[], lonKey: K1, latKey: K2, type: 'Point' | 'LineString' | 'Polygon'): GeoJSON.FeatureCollection {
//     let feats: Array<GeoJSON.Feature> = [];
//     if (type == 'Point') {
//         points.forEach(t => {
//             feats.push({
//                 type: "Feature",
//                 properties: t,
//                 geometry: {
//                     type: type,
//                     coordinates: [t[lonKey], t[latKey]]
//                 }
//             })
//         })
//     }
//     return {
//         type: "FeatureCollection",
//         features: feats,
//     }
// }
// }
// export default GisUtil;
