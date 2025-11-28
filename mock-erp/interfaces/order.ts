import { Customer } from './customer'
import { OrderItem } from './order-item'

export interface Order {
    orderHeader: {
        orderNumber: number,
        orderDate: string,
        customer: Customer,
    },
    orderItems: {
        item: OrderItem[]
    }
}