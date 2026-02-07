
import express from "express";

const router = express.Router();

// 🚫 AI DISABLED DUE TO PRICING
router.post("/chat", (req, res) => {
  return res.status(503).json({
    reply: "AI Assistant is currently disabled due to API pricing limitations."
  });
});

export default router;
