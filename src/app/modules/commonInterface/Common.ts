import { IGenericMessage } from "./IGenericMessage";

export type IGenericErrorPresponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericMessage[];
};
