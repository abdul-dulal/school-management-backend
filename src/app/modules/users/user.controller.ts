import { Request, Response } from "express";
import { createUser } from "./user.service";

export const createdUser = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({
      success: true,
      message: "Create user successfully",
      data: user,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: "Failed to create user" });
  }
};
