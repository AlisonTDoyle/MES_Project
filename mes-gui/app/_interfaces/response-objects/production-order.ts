import { ProductionOrderItem } from "../production-order/production-order-item"

export interface ProductionOrderResponse {
    orderInfo: {
        id?:number,
        customerId:number,
        orderPlacedOn:Date,
        deadline?:Date,
        customerName:string
    },
    products: any[]
}