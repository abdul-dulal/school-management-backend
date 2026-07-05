import { IGenericMessage } from "./IGenericMessage";

export type IGenericErrorPresponse = {
  statusCode: number | string;
  message: string;
  errorMessages: IGenericMessage[];
};
