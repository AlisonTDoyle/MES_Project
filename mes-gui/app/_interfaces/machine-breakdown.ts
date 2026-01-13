export interface MachineBreakdown {
    id?:number,
    mahcineId:number,
    reportingOperatorId:number,
    description:string,
    timestamp:Date,
    resolved:boolean,
    type?:number
}