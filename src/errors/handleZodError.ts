import { ZodError, ZodIssue } from "zod";
import { IGenericMessage } from "../app/modules/commonInterface/IGenericMessage";
import { IGenericErrorPresponse } from "../app/modules/commonInterface/Common";

const handleZodError = (error: ZodError): IGenericErrorPresponse => {
  const errors: IGenericMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1]?.toString() || "",
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorMessages: errors,
  };
};

export default handleZodError;
