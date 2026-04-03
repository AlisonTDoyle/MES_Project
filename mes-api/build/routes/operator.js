"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const line_status_1 = require("../controllers/operator/line-status");
const work_order_1 = require("../controllers/operator/work-order");
// Set up router
const router = express_1.default.Router();
// Routes
router.get("/:operatorId/line-status", line_status_1.readOperatorLineStatus);
router.get("/:operatorId/work-order", work_order_1.readTodaysWorkOrders);
router.post("/:operatorId/line-status", line_status_1.createNewOperatorLineStatusRecord);
router.post("/:operatorId/work-order", work_order_1.updateWorkOrderStatus);
// Make router available
exports.default = router;
