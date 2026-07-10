import express from "express";

import { AnyZodObject } from "zod/v3";

import { validateRequest } from "../../middleware/validateRequest";
import {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
} from "./academicSemester.validation";
import {
  createAcademicSemester,
  getAllSemesters,
  getSingleSemesterController,
  semesterUpdateController,
} from "./academicSemester.controller";
const router = express.Router();

router.post(
  "/create-semester",
  validateRequest(createAcademicSemesterZodSchema as unknown as AnyZodObject),
  createAcademicSemester
);

router.get("/", getAllSemesters);
router.patch(
  "/:id",
  validateRequest(updateAcademicSemesterZodSchema as unknown as AnyZodObject),
  semesterUpdateController
);
router.get("/:id", getSingleSemesterController);

export default router;
