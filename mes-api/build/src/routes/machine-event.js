"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const type_1 = require("../controllers/machine-event/type");
const machine_event_1 = require("../controllers/machine-event/machine-event");
// Set up router
const router = express_1.default.Router();
// Routes
router.get("/type", type_1.readMachineIssueType);
router.get("/recent", machine_event_1.getLatestMachineEvents);
router.post("/", machine_event_1.createNewMachineEventRecord);
// Make router available
exports.default = router;
