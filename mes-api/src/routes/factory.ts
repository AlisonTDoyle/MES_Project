import express, { Router } from "express";
import { readTodaysFactoryOutput } from "../controllers/factory/factory";

// Set up router
const router: Router = express.Router();

// routes
router.get("/todays-output", readTodaysFactoryOutput)

// make router available
export default router;