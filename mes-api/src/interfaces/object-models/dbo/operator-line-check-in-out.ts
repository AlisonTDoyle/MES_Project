import Joi from "joi";

export interface OperatorLineCheckInOut {
    id?:number,
    operatorId:number,
    lineId:number,
    checkedIn:number,
    timestamp: Date
}

export const ValidateOperatorLineCheckInOut = (operatorLineCheckInOut: OperatorLineCheckInOut) => {
    const schema = Joi.object<OperatorLineCheckInOut>({
        id: Joi.number().min(0).optional(),
        operatorId: Joi.number().min(0).required(),
        lineId: Joi.number().min(0).required(),
        checkedIn: Joi.number().required(),
        timestamp: Joi.date().optional()
    });

    return schema.validate(operatorLineCheckInOut);
}