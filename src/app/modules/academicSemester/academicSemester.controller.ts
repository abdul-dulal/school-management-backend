import { NextFunction, Request, Response } from "express";
import { createSemester, getAllsemesters } from "./academicSemester.service";
import catchAsync from "../../../share/catchAsync";
import sendResponse from "../../../share/sendResponse";
import httpStatus from "http-status";
import { IAcademicSemester } from "./academicSemester.interface";
import pick from "../../../share/pick";
import { paginationFields } from "../../../constants/pagination";

export const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await createSemester(req.body);

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic semester created successfully!",
      data: result,
    });
    next();
  }
);

export const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await getAllsemesters(filters, paginationOptions);

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semesters retrieved successfully !",
    meta: result.meta,
    data: result.data,
  });
});
