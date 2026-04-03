"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateProductionOrderItem = void 0;
const joi_1 = __importDefault(require("joi"));
const ValidateProductionOrderItem = (productionOrderItem) => {
    const schema = joi_1.default.object({
        id: joi_1.default.number().optional(),
        completed: joi_1.default.boolean().required(),
        productOrderId: joi_1.default.number().required(),
        productId: joi_1.default.number().required(),
        quantity: joi_1.default.number().required()
    });
    return schema.validate(productionOrderItem);
};
exports.ValidateProductionOrderItem = ValidateProductionOrderItem;
