import { NextFunction, Request, RequestHandler, Response } from "express";
import { createUser } from "./user.service";

export const createdUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({
      success: true,
      message: "Create user successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
