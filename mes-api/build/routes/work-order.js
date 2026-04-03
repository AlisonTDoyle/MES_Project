"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const work_order_1 = require("../controllers/work-order/work-order");
// Set up router
const router = express_1.default.Router();
// Routes
router.get("/", work_order_1.readWorkOrders);
router.get("/statuses", work_order_1.readStatusesOfAllOngoingWorkOrders);
router.post("/", work_order_1.readWorkOrdersForTimePeriod);
// Make router available
exports.default = router;
