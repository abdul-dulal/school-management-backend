import express, { Request, Response } from "express";
import cors from "cors";
import userRouter from "./app/modules/users/user.route";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app = express();

app.use(cors());
app.use(express.json());

// app/errors/AppError.ts

app.use("/api/v1/users", userRouter);
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
  throw new Error("Unexpected error");
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
