import { Request } from "@/utils/Request";
import { BaseResult, PageResult } from "../IResult";
import { ICAO } from "@/types/test/Test";

export function getAllAirport(): Promise<PageResult<ICAO>> {
    return Request.get('/api/test/geticaoList')
}