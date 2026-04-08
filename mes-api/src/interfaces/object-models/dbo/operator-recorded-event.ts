import Joi from "joi";

export interface OperatorRecordedEvent {
    id?:number,
    machineId:number,
    reportingOperatorId:string,
    description:string,
    timestamp:Date,
    resolved?:boolean,
    relatedIssue:number,
    eventType:number
}

export const ValidateOperatorRecordedEvent = (event: OperatorRecordedEvent) => {
    const schema = Joi.object<OperatorRecordedEvent>({
        id: Joi.number().min(0).optional(),
        machineId: Joi.number().min(0).required(),
        reportingOperatorId: Joi.string().required(),
        description: Joi.string().required(),
        timestamp: Joi.date().required(),
        resolved: Joi.number().optional(),
        relatedIssue: Joi.number().min(0).required(),
        eventType: Joi.number().min(0).max(2).required()
    });

    return schema.validate(event);
}