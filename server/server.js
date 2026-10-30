
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";
import chatRoutes from "./routes/chat.js";
import openaiRoutes from "./routes/openaiRoutes.js";

dotenv.config();

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

// Middleware
app.use(express.json({ limit: "20kb" }));

// Existing Gemini Chat Route
app.use("/api", chatRoutes);

// New OpenAI Chat Route
app.use("/api/openai", openaiRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("UniAble Backend is running");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
