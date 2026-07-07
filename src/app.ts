import express, { Request, Response } from "express";
import cors from "cors";
import userRouter from "./app/modules/users/user.route";
import AcademicSemesterRouter from "./app/modules/academicSemester/academicSemester.route";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/academic-semesters", AcademicSemesterRouter);

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello world");
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
