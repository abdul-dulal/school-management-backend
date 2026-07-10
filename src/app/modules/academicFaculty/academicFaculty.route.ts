import express from "express";
import { createAcademicFacultyZodSchema } from "./academicFaculty.validation";

import { AnyZodObject } from "zod/v3";
import { validateRequest } from "../../middleware/validateRequest";
import { createFacultyController } from "./academicFaculty.controller";
const router = express.Router();
router.post(
  "/create-faculty",
  validateRequest(createAcademicFacultyZodSchema as unknown as AnyZodObject),
  createFacultyController
);

export default router;
