import mongoose from "mongoose";
import { errorLogger, logger } from "../share/logger";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);

    logger.info("MongoDB Connected");
  } catch (error) {
    errorLogger.error(error);
    process.exit(1);
  }
};
