import express, { Router } from "express";
import {readBreakdownTypes} from "./../controllers/breakdown/type";
import { createNewOperatorLineStatusRecord, readOperatorLineStatus } from "../controllers/operator/line-status";
import { readTodaysWorkOrders, updateWorkOrderStatus } from "../controllers/operator/work-order";

// Set up router
const router: Router = express.Router();

// Routes
router.get("/:operatorId/line-status", readOperatorLineStatus);
router.get("/:operatorId/work-order", readTodaysWorkOrders)

router.post("/:operatorId/line-status", createNewOperatorLineStatusRecord);
router.post("/:operatorId/work-order", updateWorkOrderStatus);

// Make router available
export default router;