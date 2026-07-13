import { z } from "zod";

const createFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      error: "Title is required",
    }),
  }),
});

const updatefacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      error: "Title is required",
    }),
  }),
});

export const AcademicFacultyValidation = {
  createFacultyZodSchema,
  updatefacultyZodSchema,
};
