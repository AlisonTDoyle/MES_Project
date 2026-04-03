"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateOperatorRecordedEvent = void 0;
const joi_1 = __importDefault(require("joi"));
const ValidateOperatorRecordedEvent = (event) => {
    const schema = joi_1.default.object({
        id: joi_1.default.number().min(0).optional(),
        machineId: joi_1.default.number().min(0).required(),
        reportingOperatorId: joi_1.default.number().min(0).required(),
        description: joi_1.default.string().required(),
        timestamp: joi_1.default.date().required(),
        resolved: joi_1.default.number().optional(),
        relatedIssue: joi_1.default.number().min(0).required(),
        eventType: joi_1.default.number().min(0).max(2).required()
    });
    return schema.validate(event);
};
exports.ValidateOperatorRecordedEvent = ValidateOperatorRecordedEvent;
