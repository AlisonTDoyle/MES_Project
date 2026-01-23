import express, { Router } from "express";

// set up router
const router: Router = express.Router();

// routes
router.post("/login");
router.post("/logout");

// make router available
export default router;