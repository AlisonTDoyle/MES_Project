"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product/product");
// Set up router
const router = express_1.default.Router();
// Routes
router.get("/", product_1.fetchProducts);
// Make router available
exports.default = router;
