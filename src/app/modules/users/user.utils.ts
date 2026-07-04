import { UserModel } from "./user.models";

let roleCounter = 0;

export const lastUserId = async () => {
  const lastUser = await UserModel.findOne({}, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();
  return lastUser?.id;
};

export const generateRoleId = async (): Promise<string> => {
  const currentId = (await lastUserId()) || roleCounter.toString().padStart(5, "0");
  const incrementedId = (currentId ? parseInt(currentId) + 1 : 1).toString().padStart(5, "0");
  return incrementedId;
};
