import express from "express";
import { adminOnly, userVerify } from "../middlewares/authMiddleware.js";
import {
  createTask,
  getTasks,
  deleteTask,
  getTaskById,
  updateTask,
  updateTaskStatus,
  updateTaskChecklist,
  getDashboardData,
  getUserDashboardData,
} from "../controllers/taskController.js";
const router = express.Router();

router.post("/", userVerify, adminOnly, createTask);

// admin-all, member-assignedTo
router.get("/", userVerify, getTasks);
router.get("/dashboard-data", userVerify, getDashboardData);
router.get("/user-dashboard-data", userVerify, getUserDashboardData);
router.get("/:id", userVerify, getTaskById);
router.put("/:id", userVerify, updateTask);
router.put("/:id/status", userVerify, updateTaskStatus); // Update task status
router.put("/:id/todo", userVerify, updateTaskChecklist); // Update task checklist
router.delete("/:id", userVerify, adminOnly, deleteTask); // Delete a task (Admin only)

export default router;
