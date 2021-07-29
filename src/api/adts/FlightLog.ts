import { Request } from "@/utils/Request";
import { FlightLog } from "@/types/models/FlightLog";
import { BaseResult, PageResult } from "../IResult";

export function getFlights(current: number, pageSize: number): Promise<PageResult<FlightLog>> {
    return Request.get("/api/test/testQuery", {
        params: {
            current: current,
            pageSize: pageSize
        }
    });
}

/**
 * 
 * @param current 
 * @param pageSize 
 * @returns 
 */
export function getFlightLogByPage(current: number, pageSize: number): Promise<PageResult<FlightLog>> {
    return Request.get('/api/flightlog/cache/getFlightLogCacheByPage', {
        params: {
            currentPage: current,
            pageSize: pageSize
        }
    })
}


/**
 * 获取实际航线点集合
 * @param current 
 * @param pageSize 
 * @returns [[经度，纬度，运动方向，高度，上报时间，速度]]
 */
export function getMBFlightPath(mbbh: string): Promise<PageResult<[number, number, number, number, number, number]>> {
    return Request.get('/api/flightlog/getMBFlightPath', {
        params: {
            mbbh: mbbh
        }
    })
}

/**
 * 根据视觉边界获取飞机
 * @param minLon 
 * @param maxLon 
 * @param minLat 
 * @param maxLat 
 * @returns 
 */
export function getFlightLogCacheByHorizon(minLon: number, maxLon: number, minLat: number, maxLat: number): Promise<PageResult<FlightLog>> {
    return Request.get('/api/flightlog/cache/getFlightLogCacheByHorizon', {
        params: {
            minLongitude: minLon,
            maxLongitude: maxLon,
            minLatitude: minLat,
            maxLatitude: maxLat
        }
    })
}

export function getAllFlightLogCache(): Promise<PageResult<[string, number, number, string, string, string, string, number, number, number]>> {
    return Request.get('/api/flightlog/cache/getAllFlightLogCache')
}

/**
 * 根据目标编号获取目标的最新一条数据
 * @param mbbh 目标编号
 * @returns 
 */
export function getMBLastFlightLog(mbbh: string): Promise<BaseResult<FlightLog>> {
    return Request.get('/api/flightlog/cache/getMBLastFlightLog', {
        params: {
            mbbh: mbbh
        }
    })
}

/**
 * 根据目标编号获取目标的最新一条数据
 * @param mbbh 目标编号
 * @returns 
 */
export function getMBFlightPathDesc(mbbh: string): Promise<PageResult<FlightLog>> {
    return Request.get('/api/flightlog/getMBFlightPathDesc', {
        params: {
            mbbh: mbbh
        }
    })
}



/**
 * 
 * @param centerLongitude 中心点经度
 * @param centerLatitude 中心点纬度
 * @param lngSpan 经度跨度
 * @param latSpan 纬度跨度
 * @param flightNature 飞行性质 1：民用 2：军用
 * @returns 
 */
export function getPartFlightLogCache(centerLongitude: number, centerLatitude: number, lngSpan: number, latSpan: number, flightNature: number): Promise<PageResult<[string, number, number, string, string, string, number, number, number, number, string]>> {
    return Request.get('/api/flightlog/cache/getFlightCacheByCenter', {
        params: {
            centerLon: centerLongitude,
            centerLat: centerLatitude,
            spanLon: lngSpan,
            spanLat: latSpan,
            flightNature: flightNature,
        }
    })
}


export function getFlightCacheByBlockNos(nos: number[]): Promise<PageResult<[string, number, number, string, string, string, number, number, number, number, string]>> {
    return Request.post("/api/flightlog/cache/getFlightCacheByBlockNos", nos);
}


export function getFlightPartCacheByCenter(centerBlock: number, corRow: number, corCol: number, partTotal: number, partNo: number): Promise<PageResult<[string, number, number, string, string, string, number, number, number, number, string]>> {
    return Request.get("/api/flightlog/cache/getFlightPartCacheByCenter", {
        params: {
            centerBlock: centerBlock,
            corRow: corRow,
            corCol: corCol,
            partTotal: partTotal,
            partNo: partNo
        }
    });
}
