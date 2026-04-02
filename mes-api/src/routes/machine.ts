import express, { Router } from "express";
import { readMachineEventHistory } from "../controllers/machine/event";
import { createNewMachine, deleteMachine, getMachineById, readMachinesThatContainSearchTerm, searchForMachinesById, updateMachine } from "../controllers/machine/machine";
import { getCurrentWorkOrderForMachine } from "../controllers/machine/work-order";

// Set up router
const router: Router = express.Router();

// Routes
router.get("/:id", getMachineById);
router.get("/", searchForMachinesById); // used for searching eg ?search=12345
router.get("/:machineId/events", readMachineEventHistory);
router.get("/:machineId/current-work-order", getCurrentWorkOrderForMachine);
router.get("/search/:searchTerm", readMachinesThatContainSearchTerm); // used for searching eg /search/12345

router.post("/", createNewMachine);

router.put("/:id", updateMachine);

router.delete('/:id', deleteMachine);

// Make router available
export default router;