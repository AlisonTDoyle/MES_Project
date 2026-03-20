import express, { Router } from "express";
import { fetchCustomers } from "../controllers/customer/customer";

// Set up router
const router: Router = express.Router();

// Routes
router.get("/", fetchCustomers);

// Make router available
export default router;