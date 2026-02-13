import express, { Router } from "express";
import { createNewQualitySampleRecord, deleteQualitySample, getQualitySampleById, getQualitySamplesByProductionOrder, updateQualitySample } from "../controllers/quality-sample/quality-sample";

// set up router
const router: Router = express.Router();

// routes
router.get("/", getQualitySamplesByProductionOrder); // uses query param
router.get("/:id", getQualitySampleById);

router.post("/", createNewQualitySampleRecord);

router.put("/:id", updateQualitySample);

router.delete('/:id', deleteQualitySample);

// make router available
export default router;