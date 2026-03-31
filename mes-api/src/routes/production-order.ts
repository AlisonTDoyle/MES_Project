import express, { Router } from "express";
import { createNewProductionOrder, readProductionOrder, readProductionOrders, readProductionOrdersThatContainSearchTerm } from "../controllers/production-order/production-order";

// set up router
const router: Router = express.Router();

// routes
router.get("/:productionOrderId", readProductionOrder);
router.get("/", readProductionOrders);
router.get("/search/:searchTerm", readProductionOrdersThatContainSearchTerm);

router.post("/", createNewProductionOrder);

// make router available
export default router