import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import doctorsRouter from "./doctors";
import slotsRouter from "./slots";
import appointmentsRouter from "./appointments";
import adminRouter from "./admin";
import doctorDashboardRouter from "./doctor-dashboard";
import uploadsRouter from "./uploads";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(doctorsRouter);
router.use(slotsRouter);
router.use(appointmentsRouter);
router.use(adminRouter);
router.use(doctorDashboardRouter);
router.use("/uploads", uploadsRouter);

export default router;
