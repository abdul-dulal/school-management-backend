import express from "express";

import { AnyZodObject } from "zod/v3";

import { validateRequest } from "../../middleware/validateRequest";
import { createAcademicSemesterZodSchema } from "./academicSemester.validation";
import { createAcademicSemester } from "./academicSemester.controller";
const router = express.Router();

router.post(
  "/create-semester",
  validateRequest(createAcademicSemesterZodSchema as unknown as AnyZodObject),
  createAcademicSemester
);

export default router;
