import z from "zod";

export const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      error: "Title is required",
    }),
  }),
});
