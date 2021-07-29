import { FlowImageModel } from "@/types/models/Adzs";
import { Request } from "@/utils/Request";
import { BaseResult, PageResult } from "../IResult";

export function getmockdata(): Promise<BaseResult<any>> {
    return Request.get("/api/adzs/getmockdata");
}



/**
 * 
 * @returns 获取流程图树形数据
 */
export function getTreeData(stage: number): Promise<BaseResult<any>> {
    return Request.get("/api/adzs/getTreeData", {
        params: {
            stage: stage
        }
    });
}

/**
 * 
 * @returns 获取基地数据
 */
export function getBaseAirports(): Promise<BaseResult<any>> {
    return Request.get("/api/adzs/getBaseAirports");
}

/**
 * 
 * @returns 获取航管数据
 */
export function getAirTrafficControl(): Promise<BaseResult<any>> {
    return Request.get("/api/adzs/getAirTrafficControl");
}

/**
 * 
 * @returns 获取塔台数据
 */
export function getTower(): Promise<BaseResult<any>> {
    return Request.get("/api/adzs/getTower");
}

/**
 * 
 * @returns 获取飞行路线
 */
export function getFlightLine(stage: number): Promise<PageResult<any>> {
    return Request.get("/api/adzs/getFlightLine", {
        params: {
            stage: stage
        }
    });
}


/**
 * 
 * @returns 获取预测飞行路线
 */
export function getForecastPoint(stage: number): Promise<BaseResult<any>> {
    return Request.get("/api/adzs/getForecastPoint", {
        params: {
            stage: stage
        }
    });
}

/**
 * 流程示意图
 * @returns 
 */
export function getFlowImages(): Promise<PageResult<FlowImageModel>> {
    return Request.get("/api/adzs/flow/flowimg");
}



