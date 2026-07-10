import { SortOrder } from "mongoose";
import ApiError from "../../../errors/AppError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../interface/pagination";
import { IGenericResponse } from "../commonInterface/Common";
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from "./academicSemester.constant";
import { IAcademicSemester, IAcademicSemesterFilters } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import httpStatus from "http-status";

export const createSemester = async (payload: IAcademicSemester): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Semester Code");
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

export const getAllsemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const getSingleSemester = async (id: string | null) => {
  const result = await AcademicSemester.findById(id);
  return result;
};
export const updateSemester = async (id: string | null, payload: Partial<IAcademicSemester>) => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Semester Code");
  }
  const result = await AcademicSemester.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
export const deleteSemester = async (id: string | null) => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};
