import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import connectDB from "./config.js";
import authRotues from "./routes/authRotues.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

config(); // Load environment variables

app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "http://localhost:5174",
    ],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());

// MongoDB Connection
connectDB();

// Routes
app.use("/api/auth", authRotues);
app.use("/api/employees", employeeRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
