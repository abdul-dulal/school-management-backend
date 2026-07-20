import { Types, Model } from "mongoose";
import { IStudent } from "../student/student.interface";

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: boolean;
  student?: Types.ObjectId | IStudent;
};

// export type IUserMethods = {
//   isUserExist(id: string): Promise<Partial<IUser | null>>;
//   isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
// };

// export type User = Model<IUser, Record<string, unknown>, IUserMethods>;
export type UserModel = {
  isUserExist(id: string): Promise<Pick<IUser, "id" | "password" | "role" | "needsPasswordChange">>;
  isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
} & Model<IUser>;
