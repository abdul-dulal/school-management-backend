import { NextFunction, Request, Response } from "express";
import {
  createSemester,
  deleteSemester,
  getAllsemesters,
  getSingleSemester,
  updateSemester,
} from "./academicSemester.service";
import catchAsync from "../../../share/catchAsync";
import sendResponse from "../../../share/sendResponse";
import httpStatus from "http-status";
import { IAcademicSemester } from "./academicSemester.interface";
import pick from "../../../share/pick";
import { paginationFields } from "../../../constants/pagination";
import { academicSemesterFilterableFields } from "./academicSemester.constant";

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

export const getSingleSemesterController = catchAsync(async (req: Request, res: Response) => {
  const result = await getSingleSemester(req.params.id as string);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester retrieved successfully!",
    data: result,
  });
});
export const semesterUpdateController = catchAsync(async (req: Request, res: Response) => {
  const result = await updateSemester(req.params.id as string, req.body);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester updated successfully!",
    data: result,
  });
});

export const semesterDeleteController = catchAsync(async (req: Request, res: Response) => {
  const result = await deleteSemester(req.params.id as string);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester deleted successfully!",
    data: result,
  });
});
