import { z } from "zod";

const createAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      error: "Academic title is required",
    }),
    academicFaculty: z.string({
      error: "Academic department is required",
    }),
  }),
});

const updateAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
};
