import express from "express";
import { createdUser } from "./user.controller";
const router = express.Router();

router.post("/create-user", createdUser);

export default router;
