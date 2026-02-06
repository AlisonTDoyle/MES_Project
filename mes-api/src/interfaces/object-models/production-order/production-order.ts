import { Product } from './../dbo/product'

export interface ProductionOrder {
    id?: string
    customerId: number
    orderPlacedOn: Date
    deadline?: Date
    products: Product[]
}