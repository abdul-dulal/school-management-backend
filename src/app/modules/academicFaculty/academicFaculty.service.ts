import ApiError from "../../../errors/AppError";
import { IAcadeacademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

export const createFaculty = async (
  payload: IAcadeacademicFaculty
): Promise<IAcadeacademicFaculty | null> => {
  const createdUser = await AcademicFaculty.create(payload);
  if (!createdUser) {
    throw new ApiError(400, "Failed to create user");
  }
  return createdUser;
};
