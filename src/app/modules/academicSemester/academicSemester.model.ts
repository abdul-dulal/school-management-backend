import { Schema, model } from "mongoose";
import httpStatus from "http-status";
import { IAcademicSemester } from "./academicSemester.interface";
import {
  academicSemesterCodes,
  academicSemesterTitles,
  acdemicSemesterMonths,
} from "./academicSemester.constant";
import ApiError from "../../../errors/AppError";

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitles,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: acdemicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: acdemicSemesterMonths,
    },
    // syncId: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

academicSemesterSchema.pre("save", async function () {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });

  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, "Academic semester is already exist !");
  }
});

export const AcademicSemester = model<IAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
