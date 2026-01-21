import express, { Router } from "express";
import { createNewQualitySampleRecord, getQualitySampleById, getQualitySamplesByWorkOrder } from "../controllers/quality-sample/quality-sample";

// set up router
const router: Router = express.Router();

// routes
router.get("/", getQualitySamplesByWorkOrder); // uses query param
router.get("/:id", getQualitySampleById);

router.post("/", createNewQualitySampleRecord);

// make router available
export default router;