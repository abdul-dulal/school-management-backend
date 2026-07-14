import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";

import { studentFilterableFields } from "./student.constant";

import { StudentService } from "./student.service";
import catchAsync from "../../../share/catchAsync";
import sendResponse from "../../../share/sendResponse";
import { IStudent } from "./student.interface";
import pick from "../../../share/pick";

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await StudentService.getSingleStudent(id as string);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student fetched successfully !",
    data: result,
  });
});

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await StudentService.getAllStudents(filters, paginationOptions);

  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students fetched successfully !",
    meta: result.meta,
    data: result.data,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await StudentService.updateStudent(id as string, updatedData);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student updated successfully !",
    data: result,
  });
});
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await StudentService.deleteStudent(id as string);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student deleted successfully !",
    data: result,
  });
});

export const StudentController = {
  getSingleStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
};
