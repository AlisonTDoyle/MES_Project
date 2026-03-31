export interface WorkOrder {
    id:number,
    operatorId:number,
    lineId:number,
    description?:string,
    scheduleDate:Date,
    completed:boolean,
    createdAt:Date,
}