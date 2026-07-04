import express, { Request, Response } from "express";
import cors from "cors";
import userRouter from "./app/modules/users/user.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
  res.send("API is running...");
});

export default app;
