import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import connect from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import taskRoutes from "./routes/taskRoute.js";
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(json());

config();

// connect db
connect();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
// app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
