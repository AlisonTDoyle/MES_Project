import express, { Router } from "express";
import { readWorkOrders, readWorkOrdersForTimePeriod } from "../controllers/work-order/work-order";

// Set up router
const router: Router = express.Router();

// Routes
router.get("/", readWorkOrders);

router.post("/", readWorkOrdersForTimePeriod);

// Make router available
export default router;