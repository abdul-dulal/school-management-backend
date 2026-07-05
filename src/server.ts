import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { errorLogger, logger } from "./share/logger";
import { Server } from "http";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  let server: Server;
  try {
    await connectDB();
    server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    errorLogger.error("Failed to start server: ", error);
  }
  process.on("uncaughtException", (error) => {
    if (server) {
      server.close(() => {
        errorLogger.error("Uncaught Exception :", error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};

startServer();
