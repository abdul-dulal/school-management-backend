import { RequestHandler } from "express";
import { createSemester } from "./academicSemester.service";

export const createAcademicSemester: RequestHandler = async (req, res, next) => {
  console.log("test api");
  try {
    const result = await createSemester(req.body);
    res.status(200).json({
      success: true,
      message: "Academic semester created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
