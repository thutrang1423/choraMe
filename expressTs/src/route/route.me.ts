import express from "express";
import { getCurrentUser, updateUser } from "../app/controller/me.controller";
import { verifyToken } from "../app/middleware/authMiddleware";

const router = express.Router();

router.get("/", verifyToken, getCurrentUser);
router.put("/", verifyToken, updateUser);

export default router;
