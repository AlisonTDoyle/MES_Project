import express, { Router } from "express";
import { fetchProducts } from "../controllers/product/product";

// Set up router
const router: Router = express.Router();

// Routes
router.get("/", fetchProducts);

// Make router available
export default router;