// @ts-nocheck
/**
 * This is the Vercel Serverless Function entry point.
 * We import the PRE-BUNDLED app from the dist directory.
 * This ensures all workspace dependencies are already baked in.
 */
import app from "../artifacts/api-server/dist/vercel.mjs";

export default async function handler(req, res) {
  try {
    return app(req, res);
  } catch (err) {
    console.error("[VERCEL_API] Runtime error:", err);
    res.status(500).json({ 
      error: "Runtime error", 
      message: err.message
    });
  }
}
