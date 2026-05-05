// @ts-nocheck
import app from "../artifacts/api-server/src/app.js";

export default async function handler(req, res) {
  try {
    return app(req, res);
  } catch (err) {
    console.error("[VERCEL_API] Runtime error:", err);
    res.status(500).json({ 
      error: "Runtime error", 
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
  }
}
