import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { errorLogger, logger } from "./share/logger";
import { Server } from "http";

const PORT = process.env.PORT || 5000;

process.on("uncaughtException", (err) => {
  errorLogger.error(" Uncaught Exception:", err);
  process.exit(1);
});

let server: Server;
const startServer = async () => {
  try {
    await connectDB();
    server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    errorLogger.error("Failed to start server: ", error);
  }

  process.on("unhandledRejection", (reason, promise) => {
    errorLogger.error("Unhandled Rejection:", reason);

    server.close(() => {
      process.exit(1);
    });
  });
};

startServer();

process.on("SIGTERM", () => {
  logger.info("SIGTERM is received");
  if (server) {
    server.close();
  }
});
