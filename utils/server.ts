import express, { NextFunction, Request, Response } from "express";
import jobRouter from "../routers/jobRouter";
import authRouter from "../routers/authRouter";
import userRouter from "../routers/userRouter";
import path from "path";

import morgan from "morgan";
import { errorHandlerMiddleware } from "../middleware/errorHandlerMiddleware";
import { authenticateUser } from "../middleware/authMiddleware";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
function createServer() {
  const app = express();
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }
  console.log(__dirname);
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.use(express.json());
  app.use(cookieParser());

  app.use(helmet());
  app.use(mongoSanitize());

  app.use("/api/v1/jobs", authenticateUser, jobRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/users", authenticateUser, userRouter);

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
  });

  app.use("*", (req, res) => {
    res.status(404).json({ msg: "not found" });
  });
  app.use(errorHandlerMiddleware);

  return app;
}

export default createServer;
