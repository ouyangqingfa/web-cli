import { Request } from "@/utils/Request";
import { PolygonalArea } from "@/types/models/PolygonalArea";
import { BaseResult, PageResult } from "../IResult";

export function saveArea(area: PolygonalArea): Promise<boolean> {
        return Request.post('/api/area/saveArea', area)
}

export function getAllArea(): Promise<BaseResult<Array<PolygonalArea>>> {
        return Request.get('/api/area/getAreaList')
}

export function deleteArea(areaId: string): Promise<boolean> {
        return Request.get('/api/area/deleteArea', {
                params: {
                        id: areaId
                }
        })
}

