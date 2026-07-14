import { Request, Response } from "express";
import { IUser } from "./user.interface";
import { UserModel } from "./user.models";

import ApiError from "../../../errors/AppError";
import httpStatus from "http-status";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { generateStudentId } from "./user.utils";
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { Student } from "../student/student.model";
import mongoose from "mongoose";

const createStudent = async (student: IStudent, user: IUser): Promise<IUser | null> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = process.env.DEFAULT_STUDENT_PASSWORD as string;
  }
  // set role
  user.role = "student";

  const academicsemester = await AcademicSemester.findById(student.academicSemester).lean();

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate student id
    const id = await generateStudentId(academicsemester as IAcademicSemester);
    // set custom id into both  student & user
    user.id = id;
    student.id = id;

    // Create student using sesssin
    const newStudent = await Student.create([student]);

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    // set student _id (reference) into user.student
    user.student = newStudent[0]._id;

    const newUser = await UserModel.create([user]);

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await UserModel.findOne({ id: newUserAllData.id }).populate({
      path: "student",
      populate: [
        {
          path: "academicSemester",
        },
        {
          path: "academicDepartment",
        },
        {
          path: "academicFaculty",
        },
      ],
    });
  }

  // if (newUserAllData) {
  //   await RedisClient.publish(EVENT_STUDENT_CREATED, JSON.stringify(newUserAllData.student));
  // }

  return newUserAllData;
};

export const UserService = {
  createStudent,
  // createFaculty,
  // createAdmin,
};
