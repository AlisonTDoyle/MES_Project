"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateMachine = void 0;
const joi_1 = __importDefault(require("joi"));
const machineType_1 = require("../../../enums/machineType");
const ValidateMachine = (machine) => {
    const schema = joi_1.default.object({
        id: joi_1.default.number().min(0).optional(),
        lineId: joi_1.default.number().min(0),
        machineType: joi_1.default.string().valid(...Object.values(machineType_1.MachineType)),
        description: joi_1.default.string().allow("")
    });
    return schema.validate(machine);
};
exports.ValidateMachine = ValidateMachine;
