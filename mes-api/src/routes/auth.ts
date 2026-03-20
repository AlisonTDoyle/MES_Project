import express, { Router } from "express";
import { refreshToken, signInUser } from "../controllers/auth/auth";

const router: Router = express.Router();

router.post("/login", signInUser);
router.post("/refresh", refreshToken);

export default router;