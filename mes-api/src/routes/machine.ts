import express, { Router } from "express";
import { readMachineEventHistory } from "../controllers/machine/event";

// Set up router
const router: Router = express.Router();

// Routes
router.get("/:machineId/events", readMachineEventHistory);

// Make router available
export default router;