"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateProductionOrder = void 0;
const joi_1 = __importDefault(require("joi"));
const ValidateProductionOrder = (productionOrder) => {
    const schema = joi_1.default.object({
        id: joi_1.default.number().min(0).optional(),
        customerId: joi_1.default.number().min(0),
        orderPlacedOn: joi_1.default.date().iso(),
        deadline: joi_1.default.date().iso().optional(),
        products: joi_1.default.array()
    });
    return schema.validate(productionOrder);
};
exports.ValidateProductionOrder = ValidateProductionOrder;
