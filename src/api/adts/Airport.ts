import { Request } from "@/utils/Request";
import { BaseResult, PageResult } from "../IResult";
import { Airport } from "@/types/models/Airport";

export function getAllAirport(): Promise<PageResult<[string, number, number, number]>> {
    return Request.get('/api/airport/getAirports')
}

/**
 * 获取目标点周围的机场
 * @param longitude 经度
 * @param latitude 纬度
 * @param radius 半径（单位：米）
 * @returns 
 */
export function getAroundAirports(longitude: number, latitude: number, radius: number): Promise<BaseResult<[Airport]>> {
    return Request.get('/api/airport/getAroundAirports', {
        params: {
            longitude: longitude,
            latitude: latitude,
            radius: radius
        }
    })
}


/**
 * 根据ident获取机场
 * @param ident
 * @returns 
 */
 export function getAirportByIdent(ident: string): Promise<BaseResult<[Airport]>> {
    return Request.get('/api/airport/getAirportByIdent', {
        params: {
            ident: ident
        }
    })
}