import { Request, Response } from "express";
import { IUser } from "./user.interface";
import { UserModel } from "./user.models";
import { generateRoleId } from "./user.utils";
import ApiError from "../../../errors/AppError";

export const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateRoleId();
  user.id = id;
  if (!user.password) {
    user.password = process.env.DEFAULT_STUDENT_PASSWORD as string;
  }
  const createdUser = await UserModel.create(user);
  if (!createdUser) {
    throw new ApiError(400, "Failed to create user");
  }
  return createdUser;
};
