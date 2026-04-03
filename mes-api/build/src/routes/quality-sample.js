"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quality_sample_1 = require("../controllers/quality-sample/quality-sample");
// set up router
const router = express_1.default.Router();
// routes
router.get("/", quality_sample_1.getQualitySamplesByProductionOrder); // uses query param
router.get("/:id", quality_sample_1.getQualitySampleById);
router.post("/", quality_sample_1.createNewQualitySampleRecord);
router.put("/:id", quality_sample_1.updateQualitySample);
router.delete('/:id', quality_sample_1.deleteQualitySample);
// make router available
exports.default = router;
