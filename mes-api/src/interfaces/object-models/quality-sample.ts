export interface QualitySample {
    id?: string;
    workOrderId: string;
    itemId: string;
    sampleTime: Date;
    result: number;
    sampleQuantity:number;
    sampleUnit:string;
    operatorId: string;
    notes:string;
}