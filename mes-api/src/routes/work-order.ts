import express, { Router } from "express";
import { readStatusesOfAllOngoingWorkOrders, readWorkOrders, readWorkOrdersForTimePeriod } from "../controllers/work-order/work-order";

// Set up router
const router: Router = express.Router();

// Routes
router.get("/", readWorkOrders);
router.get("/statuses", readStatusesOfAllOngoingWorkOrders);

router.post("/", readWorkOrdersForTimePeriod);

// Make router available
export default router;