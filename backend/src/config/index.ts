import dotenv from "dotenv";
import ms from "ms";

dotenv.config();

const config = {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV,
    // ALLOW ORIGIN FOR FRONTEND - http://localhost:3000 for development
    WHITELIST_ORIGINS: ["http://localhost:3000"],
    MONGO_URI: process.env.MONGO_URI,
    LOG_LEVEL: process.env.LOG_LEVEL || "info",
    JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET!,
    JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET!,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY as ms.StringValue,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY as ms.StringValue,
};

export default config;
