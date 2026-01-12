export interface MachineBreakdown {
    id:number,
    machineId:number,
    reportingOperatorId:number,
    description:string,
    timestamp:Date,
    resolved:boolean,
    type:number
}