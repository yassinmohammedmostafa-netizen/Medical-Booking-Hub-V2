// @ts-nocheck
let handler;

try {
  console.log("[VERCEL_API] Importing app...");
  // Use a sync import if possible, or a wrapper
  const appModule = await import("../artifacts/api-server/src/app.js");
  const app = appModule.default;
  
  handler = (req, res) => {
    try {
      return app(req, res);
    } catch (err) {
      console.error("[VERCEL_API] Runtime error:", err);
      res.status(500).json({ error: "Runtime error", message: err.message });
    }
  };
} catch (err) {
  console.error("[VERCEL_API] Startup error:", err);
  handler = (req, res) => {
    res.status(500).json({ error: "Startup error", message: err.message, stack: err.stack });
  };
}

export default handler;
