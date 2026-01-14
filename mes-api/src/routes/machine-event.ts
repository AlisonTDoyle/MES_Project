import express, { Router } from "express";
import {readBreakdownTypes} from "../controllers/machine-event/type";
import { createNewMachineEventRecord } from "../controllers/machine-event/machine-event";

// Set up router
const router: Router = express.Router();

// Routes
router.get("/type", readBreakdownTypes);

router.post("/", createNewMachineEventRecord);

// Make router available
export default router;