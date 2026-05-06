// @ts-nocheck
import pinoHttp from "pino-http";
import path from "path";
import cors from "cors";
import express, { Request, Response } from "express";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

const app: any = express();

app.use(
  (pinoHttp as any)({
    logger,
    serializers: {
      req(req: any) {
        return {
          id: (req as any).id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: any) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api", router);
app.use("/", router);

// Serve static files from the root 'public' directory
app.use(express.static(path.resolve("public")));

// Handle SPA routing: serve index.html for any unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve("public", "index.html"));
});

export default app;
