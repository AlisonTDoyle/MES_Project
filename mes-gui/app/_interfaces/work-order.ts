export interface WorkOrder {
    id:number,
    productionOrderId:number,
    productId:number,
    description?:string,
    stage:number,
    productionOrderItemId:number,
    status:number,
    creationDate:Date,
    completionDate:Date,
}