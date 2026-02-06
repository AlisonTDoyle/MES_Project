export interface OperatorRecordedEvent {
    id?:number,
    machineId:number,
    reportingOperatorId:number,
    description:string,
    timestamp:Date,
    resolved:boolean,
    relatedIssue:number,
    eventType:number
}