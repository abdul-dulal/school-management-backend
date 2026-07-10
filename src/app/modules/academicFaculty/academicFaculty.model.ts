import { Schema, model } from "mongoose";
import { IAcadeacademicFaculty } from "./academicFaculty.interface";

const academicFacultySchema = new Schema<IAcadeacademicFaculty>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const AcademicFaculty = model<IAcadeacademicFaculty>(
  "AcademicFaculty",
  academicFacultySchema
);
