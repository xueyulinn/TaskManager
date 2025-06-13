import express from "express";
import { userVerify, adminOnly } from "../middlewares/authMiddleware.js";
import { getAllUsers, getUserById } from "../controllers/userController.js";
const router = express.Router();
router.get("/", userVerify, adminOnly, getAllUsers);
router.get("/:id", userVerify, getUserById);

export default router;
