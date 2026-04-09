import express, { Router } from "express";
import { createNewProductionOrder, readProductionOrder, readProductionOrders, readProductionOrdersThatContainSearchTerm } from "../controllers/production-order/production-order";
import { ReadWorkOrdersForProductionOrderBasedOnStage } from "../controllers/production-order/work-order";

// set up router
const router: Router = express.Router();

// routes
router.get("/:productionOrderId", readProductionOrder);
router.get("/", readProductionOrders);
router.get("/search/:searchTerm", readProductionOrdersThatContainSearchTerm);
router.get("/:productionOrderId/stage/:stage", ReadWorkOrdersForProductionOrderBasedOnStage)

router.post("/", createNewProductionOrder);

// make router available
export default router