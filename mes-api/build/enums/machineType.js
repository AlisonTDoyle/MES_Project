"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineType = void 0;
var MachineType;
(function (MachineType) {
    MachineType[MachineType["Guillotine"] = 1] = "Guillotine";
    MachineType[MachineType["Grader"] = 2] = "Grader";
    MachineType[MachineType["ConveyorBelt"] = 3] = "ConveyorBelt";
    MachineType[MachineType["Extruder"] = 4] = "Extruder";
    MachineType[MachineType["Mixer"] = 5] = "Mixer";
    MachineType[MachineType["PackagingMachine"] = 6] = "PackagingMachine";
    MachineType[MachineType["LabelingMachine"] = 7] = "LabelingMachine";
    MachineType[MachineType["Palletizer"] = 8] = "Palletizer";
})(MachineType || (exports.MachineType = MachineType = {}));
