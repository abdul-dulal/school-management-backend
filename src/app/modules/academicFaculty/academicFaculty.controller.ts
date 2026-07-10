import { Response, Request, NextFunction } from "express";
import catchAsync from "../../../share/catchAsync";
import sendResponse from "../../../share/sendResponse";
import httpStatus from "http-status";
import { IAcadeacademicFaculty } from "./academicFaculty.interface";
import { createFaculty } from "./academicFaculty.service";

export const createFacultyController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await createFaculty(req.body);

    sendResponse<IAcadeacademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Create faculty successfully!",
      data: user,
    });
    next();
  }
);
