"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateOperatorLineCheckInOut = void 0;
const joi_1 = __importDefault(require("joi"));
const ValidateOperatorLineCheckInOut = (operatorLineCheckInOut) => {
    const schema = joi_1.default.object({
        id: joi_1.default.number().min(0).optional(),
        operatorId: joi_1.default.number().min(0).required(),
        lineId: joi_1.default.number().min(0).required(),
        checkedIn: joi_1.default.number().required(),
        timestamp: joi_1.default.date().optional()
    });
    return schema.validate(operatorLineCheckInOut);
};
exports.ValidateOperatorLineCheckInOut = ValidateOperatorLineCheckInOut;
