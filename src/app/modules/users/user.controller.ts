import { NextFunction, Request, Response } from "express";
import { createUser } from "./user.service";
import catchAsync from "../../../share/catchAsync";
import sendResponse from "../../../share/sendResponse";
import httpStatus from "http-status";
import { IUser } from "./user.interface";

export const createdUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await createUser(req.body);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Create user successfully!",
    data: user,
  });
  next();
});
