export interface WSMessage<T> {
    type: number,
    desc: string,
    time: string,
    data: T
}