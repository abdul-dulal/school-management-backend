import { createLogger, format, transports } from "winston";
import path from "path";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, label, printf, prettyPrint } = format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = createLogger({
  level: "info",
  format: combine(timestamp(), myFormat, prettyPrint()),

  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(process.cwd(), "logs", "winston", "success", "ph-%DATE%success.log"),
      datePattern: "YYYY-DD-MM-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});
export const errorLogger = createLogger({
  level: "error",
  format: combine(timestamp(), myFormat, prettyPrint()),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(process.cwd(), "logs", "winston", "errors", "ph-%DATE%error.log"),
      datePattern: "YYYY-DD-MM-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});
