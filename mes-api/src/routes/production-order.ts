import express, { Router } from "express";
import { createNewProductionOrder, readProductionOrder, readProductionOrders } from "../controllers/production-order/production-order";

// set up router
const router: Router = express.Router();

// routes
router.get("/:productionOrderId", readProductionOrder);
router.get("/", readProductionOrders);

router.post("/", createNewProductionOrder);

// make router available
export default router