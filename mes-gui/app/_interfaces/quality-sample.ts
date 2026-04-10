export interface QualitySample {
    id?:number
    productOrderId: string,
    workOrderId: string,
    machineId: number,
    operatorId: string,
    timestamp: string,
    sampleQuantity: number,
    sampleUnit: string,
    notes: string,
    result: number
    operatorFirstName?: string
    opertatorLastName?: string
}