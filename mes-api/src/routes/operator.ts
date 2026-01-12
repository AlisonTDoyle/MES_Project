import express, { Router } from "express";
import {readBreakdownTypes} from "./../controllers/breakdown/type";
import { createNewOperatorLineStatusRecord, readOperatorLineStatus } from "../controllers/operator/line-status";

// Set up router
const router: Router = express.Router();

// Routes
router.get("/:operatorId/line-status", readOperatorLineStatus);

router.post("/:operatorId/line-status", createNewOperatorLineStatusRecord);

// Make router available
export default router;