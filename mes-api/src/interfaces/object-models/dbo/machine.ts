import Joi from "joi";
import { MachineType } from "../../../enums/machineType";

export interface Machine {
    id?: number;
    lineId: number;
    machineType: MachineType;
    description: string;
}

export const ValidateMachine = (machine: Machine) => {
    const schema = Joi.object<Machine>({
        id: Joi.number().min(0).optional(),
        lineId: Joi.number().min(0),
        machineType: Joi.string().valid(...Object.values(MachineType)),
        description: Joi.string().allow("")
    });

    return schema.validate(machine);
}