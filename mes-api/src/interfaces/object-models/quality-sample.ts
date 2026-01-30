import Joi from "joi";

export interface QualitySample {
    id?: number;
    productOrderId: number;
    workOrderId: number;
    machineId: number;
    operatorId: number;
    timestamp: Date;
    sampleQuantity: number;
    sampleUnit: string;
    notes?: string;
    result: number;
}

export const ValidateQualitySample = (sample:QualitySample) => {
    const schema = Joi.object<QualitySample>({
        id: Joi.number().min(0).optional(),
        productOrderId: Joi.number().min(0).required(),
        workOrderId: Joi.number().min(0).required(),
        machineId: Joi.number().min(0).required(),
        operatorId: Joi.number().min(0).required(),
        timestamp: Joi.date().required(),
        sampleQuantity: Joi.number().min(0).required(),
        sampleUnit: Joi.string().required(),
        notes: Joi.string().optional().allow(""),
        result: Joi.number().min(0).max(2).required(),
    });

    return schema.validate(sample)
}