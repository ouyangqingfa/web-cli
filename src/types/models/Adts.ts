export interface MapFlightModel {
    /**
     * 目标编号
     */
    mbbh: string,
    /**
     * 经度
     */
    lon: number,
    /**
     * 纬度
     */
    lat: number,
    /**
     * 注册号
     */
    reg?: string,
    /**
     * 国家
     */
    country?: string,
    /**
     * 机型
     */
    typecode?: string,
    /**
     * 目标性质 2军用 1民用
     */
    mbxz?: number,
    /**
     * 速度
     */
    speed?: number,
    /**
     * 运动方向
     */
    ydfx?: number,
    /**
     * 高度
     */
    height?: number,
    /** 数据来源 */
    dtd?: string,

    [key: string]: any
}

import dayjs from 'dayjs'
export class FlightChartModel {
    public date: string;
    public height: number;
    public speed: number;
    public coord: [number, number];
    public rotate: number;

    constructor(d: number, h: number, s: number, c: [number, number], r: number) {
        this.height = h;
        this.speed = s;
        this.date = dayjs.unix(d).format("MM/DD HH:mm:ss");
        this.coord = c;
        this.rotate = r;
    }
}