import express, { Router } from "express";
import { getOeeFigures, readTodaysFactoryOutput, readTodaysMachineAvailability } from "../controllers/factory/factory";

// Set up router
const router: Router = express.Router();

// routes
router.get("/todays-output", readTodaysFactoryOutput)
router.get("/machine-availability", readTodaysMachineAvailability)
router.get("/oee", getOeeFigures)

// make router available
export default router;