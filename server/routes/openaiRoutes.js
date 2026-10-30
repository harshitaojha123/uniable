
import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";
import path from "node:path";
import { fileURLToPath } from "node:url";

const router = express.Router();

// Load the .env file from the server directory
const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);

dotenv.config({
  path: path.resolve(currentDir, "../.env"),
});

const apiKey = process.env.OPENAI_API_KEY?.trim();

if (!apiKey) {
  throw new Error(
    "OPENAI_API_KEY is missing. Check server/.env."
  );
}

const client = new OpenAI({ apiKey });

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (
      !message ||
      typeof message !== "string" ||
      !message.trim()
    ) {
      return res.status(400).json({
        error: "Please provide a message.",
      });
    }

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.5",
      instructions:
        "You are UniAble's accessibility assistant. Give helpful, clear, respectful answers about accessibility and campus support. Do not claim that an emergency alert was sent unless the application confirms it.",
      input: message.trim(),
    });

    return res.json({
      reply: response.output_text,
    });
  } catch (error) {
    console.error("OpenAI API error:", error.message);

    return res.status(500).json({
      error: "Unable to get a response from the AI assistant.",
    });
  }
});

export default router;
