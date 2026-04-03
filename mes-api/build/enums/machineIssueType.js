"use strict";
// using _ as a stand-in for /
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineIssueType = void 0;
var MachineIssueType;
(function (MachineIssueType) {
    MachineIssueType[MachineIssueType["Unknown"] = 1] = "Unknown";
    MachineIssueType[MachineIssueType["Control_Plc_Automation"] = 2] = "Control_Plc_Automation";
    MachineIssueType[MachineIssueType["Electrical"] = 3] = "Electrical";
    MachineIssueType[MachineIssueType["Mechanical"] = 4] = "Mechanical";
    MachineIssueType[MachineIssueType["Pnuematic_Hydraulic"] = 5] = "Pnuematic_Hydraulic";
    MachineIssueType[MachineIssueType["Sensor_Feedback"] = 6] = "Sensor_Feedback";
    MachineIssueType[MachineIssueType["Motion_Drive"] = 7] = "Motion_Drive";
    MachineIssueType[MachineIssueType["Safety"] = 8] = "Safety";
    MachineIssueType[MachineIssueType["Process_Quality"] = 9] = "Process_Quality";
    MachineIssueType[MachineIssueType["Material_Production"] = 10] = "Material_Production";
    MachineIssueType[MachineIssueType["Software"] = 11] = "Software";
})(MachineIssueType || (exports.MachineIssueType = MachineIssueType = {}));
