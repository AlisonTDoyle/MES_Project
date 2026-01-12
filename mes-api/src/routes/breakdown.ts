import express, { Router } from "express";
import {readBreakdownTypes} from "./../controllers/breakdown/type";
import { createNewBreakdownRecord } from "./../controllers/breakdown/breakdown";

// Set up router
const router: Router = express.Router();

// Routes
router.get("/type", readBreakdownTypes);

router.post("/", createNewBreakdownRecord);

// Make router available
export default router;