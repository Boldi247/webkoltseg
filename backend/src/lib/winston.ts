import winston from "winston";

import config from "@/config";
import { Environment } from "@/constants/global";

const { combine, timestamp, json, errors, align, printf, colorize } =
    winston.format;

const transports: winston.transport[] = [];

if (config.NODE_ENV !== "PROD") {
    transports.push(
        new winston.transports.Console({
            format: combine(
                colorize({ all: true }),
                timestamp({
                    format: "YYYY-MM-DD HH:mm:ss A",
                }),
                align(),
                printf(({ timestamp, level, message, ...meta }) => {
                    const metaStr = Object.keys(meta).length
                        ? `\n${JSON.stringify(meta)}`
                        : "";

                    return `${timestamp} [${level}]: ${message}${metaStr}`;
                }),
            ),
        }),
    );
}

const logger = winston.createLogger({
    level: config.LOG_LEVEL,
    format: combine(timestamp(), errors({ stack: true }), json()),
    transports,
    silent: config.NODE_ENV === Environment.TEST,
});

export { logger };
