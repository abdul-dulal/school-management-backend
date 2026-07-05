import mongoose from "mongoose";
import { IGenericMessage } from "../app/modules/commonInterface/IGenericMessage";
import { IGenericErrorPresponse } from "../app/modules/commonInterface/Common";

export const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorPresponse => {
  const errors: IGenericMessage[] = Object.values(err.errors).map((el) => {
    return {
      path: el?.path,
      message: el?.message,
    };
  });
  return {
    statusCode: 400,
    message: "Validation error",
    errorMessages: errors,
  };
};
