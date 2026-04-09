export interface QualitySample {
    productOrderId: string,
    workOrderId: string,
    machineId: number,
    operatorId: string,
    timestamp: string,
    sampleQuantity: number,
    sampleUnit: string,
    notes: string,
    result: number
}