import express, { Router } from "express";
import { readWorkOrders } from "../controllers/work-order/work-order";

// Set up router
const router: Router = express.Router();

// Routes
router.get("/", readWorkOrders)

// Make router available
export default router;