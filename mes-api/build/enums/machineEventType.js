"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineEventType = void 0;
var MachineEventType;
(function (MachineEventType) {
    MachineEventType[MachineEventType["Breakdown"] = 1] = "Breakdown";
    MachineEventType[MachineEventType["Maintenance"] = 2] = "Maintenance";
    MachineEventType[MachineEventType["FaultNotice"] = 3] = "FaultNotice";
})(MachineEventType || (exports.MachineEventType = MachineEventType = {}));
