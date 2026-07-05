import { ErrorRequestHandler } from "express";
import { handleValidationError } from "../../errors/handleValidationError";
import { IGenericMessage } from "../modules/commonInterface/IGenericMessage";
import ApiError from "../../errors/AppError";
import { errorLogger } from "../../share/logger";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong";
  let errorMessage: IGenericMessage[] = [];

  process.env.NODE_ENV === "development" ? console.log(error) : errorLogger.error(error);

  if (error?.name === "ValidationError") {
    const symplifiedError = handleValidationError(error);
    statusCode = symplifiedError.statusCode;
    message = symplifiedError.message;
    errorMessage = symplifiedError.errorMessages;
  } else if (error instanceof Error) {
    message = error.message;
    errorMessage = error.message ? [{ path: "", message: error.message }] : [];
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessage = error.message ? [{ path: "", message: error.message }] : [];
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errorMessages: errorMessage,
    stack: process.env.NODE_ENV !== "production" ? error.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
