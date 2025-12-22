import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Gemini Chat Route
app.use("/api", chatRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("UniAble Backend is running");
});

// Login, Help, Admin APIs (keep as-is)
// ...

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
