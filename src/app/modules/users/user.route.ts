import express from "express";
import { createdUser } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createStudentZodSchema } from "./user.validation";

import { AnyZodObject } from "zod/v3";
const router = express.Router();

router.post(
  "/create-user",
  validateRequest(createStudentZodSchema as unknown as AnyZodObject),
  createdUser
);

export default router;
