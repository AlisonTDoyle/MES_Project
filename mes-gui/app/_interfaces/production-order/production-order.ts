import { ProductionOrderItem } from "./production-order-item"

export interface ProductionOrder {
    id?: number
    customerId: number
    orderPlacedOn: Date
    deadline?: Date
    products: ProductionOrderItem[]
    customerName?:string
}