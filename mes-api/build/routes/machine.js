"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const event_1 = require("../controllers/machine/event");
const machine_1 = require("../controllers/machine/machine");
const work_order_1 = require("../controllers/machine/work-order");
// Set up router
const router = express_1.default.Router();
// Routes
router.get("/:id", machine_1.getMachineById);
router.get("/", machine_1.searchForMachinesById); // used for searching eg ?search=12345
router.get("/:machineId/events", event_1.readMachineEventHistory);
router.get("/:machineId/current-work-order", work_order_1.getCurrentWorkOrderForMachine);
router.get("/search/:searchTerm", machine_1.readMachinesThatContainSearchTerm); // used for searching eg /search/12345
router.post("/", machine_1.createNewMachine);
router.put("/:id", machine_1.updateMachine);
router.delete('/:id', machine_1.deleteMachine);
// Make router available
exports.default = router;
