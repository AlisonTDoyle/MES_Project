export interface WorkOrder {
    id:number,
    operatorId:number,
    machineId:number,
    description:string,
    scheduleDate:Date,
    completed:boolean,
    createdAt:Date,
}