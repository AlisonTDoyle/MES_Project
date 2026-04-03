"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateQualitySample = void 0;
const joi_1 = __importDefault(require("joi"));
const ValidateQualitySample = (sample) => {
    const schema = joi_1.default.object({
        id: joi_1.default.number().min(0).optional(),
        productOrderId: joi_1.default.number().min(0).required(),
        workOrderId: joi_1.default.number().min(0).required(),
        machineId: joi_1.default.number().min(0).required(),
        operatorId: joi_1.default.number().min(0).required(),
        timestamp: joi_1.default.date().required(),
        sampleQuantity: joi_1.default.number().min(0).required(),
        sampleUnit: joi_1.default.string().required(),
        notes: joi_1.default.string().optional().allow(""),
        result: joi_1.default.number().min(0).max(2).required(),
    });
    return schema.validate(sample);
};
exports.ValidateQualitySample = ValidateQualitySample;
