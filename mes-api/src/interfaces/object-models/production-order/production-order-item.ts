import Joi from "joi";

export interface ProductionOrderItem {
    id?: number
    completed: boolean
    productOrderId: number
    productId: number
    quantity:number
}

export const ValidateProductionOrderItem = (productionOrderItem: ProductionOrderItem) => {
    const schema = Joi.object<ProductionOrderItem>({
        id: Joi.number().optional(),
        completed: Joi.boolean().required(),
        productOrderId: Joi.number().required(),
        productId: Joi.number().required(),
        quantity:Joi.number().required()
    });

    return schema.validate(productionOrderItem);
}