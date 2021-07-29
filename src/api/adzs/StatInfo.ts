import { Request } from "@/utils/Request";
import { BaseResult, PageResult } from "../IResult";
import { FlowItemModel, IStatIOModel, IStatIMModel, IStatIAModel, IStatJZModel } from '@/types/models/Adzs'

/**
 * 获取流程定义
 * @returns 
 */
export function getFlowData(): Promise<PageResult<FlowItemModel>> {
    return Request.get("/api/adzs/getFlowData");
}

/**
 * 查询互联网公开数据统计
 * @returns 
 */
export function getStatIO(): Promise<BaseResult<IStatIOModel>> {
    return Request.get("/api/adzs/stat/io");
}
export function getStatIM(): Promise<BaseResult<IStatIMModel>> {
    return Request.get("/api/adzs/stat/im");
}
export function getStatIA(): Promise<BaseResult<IStatIAModel>> {
    return Request.get("/api/adzs/stat/ia");
}
export function getStatJZ(): Promise<BaseResult<IStatJZModel>> {
    return Request.get("/api/adzs/stat/jz");
}