"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const production_order_1 = require("../controllers/production-order/production-order");
// set up router
const router = express_1.default.Router();
// routes
router.get("/:productionOrderId", production_order_1.readProductionOrder);
router.get("/", production_order_1.readProductionOrders);
router.get("/search/:searchTerm", production_order_1.readProductionOrdersThatContainSearchTerm);
router.post("/", production_order_1.createNewProductionOrder);
// make router available
exports.default = router;
