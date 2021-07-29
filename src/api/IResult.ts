/**
 * 数据结果
 */
export interface BaseResult<T extends any> {
    code: number,
    msg: string,
    data: T
}
/**
 * 分页数据结果
 */
export interface PageResult<T extends any> {
    code: number,
    msg: string,
    totalSize: number,
    pageSize: number,
    pageCount: number,
    pageIndex: number,
    data: Array<T>
}