import Joi from 'joi'
import { Product } from './../dbo/product'
import { ProductionOrderItem, ValidateProductionOrderItem } from './production-order-item'

export interface ProductionOrder {
    id?: number
    customerId: number
    orderPlacedOn: Date
    deadline?: Date
    products: ProductionOrderItem[]
}

export const ValidateProductionOrder = (productionOrder: ProductionOrder) => {
    const schema = Joi.object<ProductionOrder>({
        id: Joi.number().min(0).optional(),
        customerId: Joi.number().min(0),
        orderPlacedOn: Joi.date().iso(),
        deadline: Joi.date().iso().optional(),
        products: Joi.array<ProductionOrderItem>()
    });

    return schema.validate(productionOrder);
}