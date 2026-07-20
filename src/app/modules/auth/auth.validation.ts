import z from "zod";

const loginZodSchema = z.object({
  body: z.object({
    id: z.string({
      error: "ID is required",
    }),
    password: z.string({
      error: "Password is required",
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
};
