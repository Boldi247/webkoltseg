import express from "express";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";

import config from "@/config";
import limiter from "@/lib/express_rate_limit";

import v1Routes from "@/routes/v1";
import { connectToDatabase, disconnectFromDatabase } from "@/lib/mongoose";
import { logger } from "@/lib/winston";

const app = express();

let server: ReturnType<typeof app.listen>;

const corsOptions: CorsOptions = {
    origin(origin, callback) {
        if (
            config.NODE_ENV === "DEV" ||
            !origin ||
            config.WHITELIST_ORIGINS.includes(origin)
        ) {
            callback(null, true);
        } else {
            const corsErrorMessage = `CORS error: ${origin} is not allowed by CORS policy`;

            callback(new Error(corsErrorMessage), false);
            logger.warn(corsErrorMessage);
        }
    },
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
    compression({
        threshold: 1024,
    }),
);

app.use(helmet());

app.use(limiter);

(async () => {
    try {
        await connectToDatabase();

        app.use("/api/v1", v1Routes);

        app.get("/test", (req, res) => {
            res.json({
                message: "hello world",
            });
        });

        server = app.listen(config.PORT, () => {
            logger.info(
                `✅ Server is running on port http://localhost:${config.PORT}`,
            );
        });
    } catch (error) {
        logger.error("Failed to start the server", error);

        if (config.NODE_ENV === "PROD") {
            process.exit(1);
        }
    }
})();

const handleServerShutdown = async () => {
    try {
        logger.info("🔻 Shutting down server...");

        if (server) {
            await new Promise<void>((resolve, reject) => {
                server.close((err) => (err ? reject(err) : resolve()));
            });
        }

        await disconnectFromDatabase();
        logger.info("✅ Shutdown complete");
        process.exit(0);
    } catch (error) {
        logger.error("❌ Error during shutdown", error);
        setTimeout(() => process.exit(1), 1000); // force exit fallback
    }
};

process.on("SIGINT", handleServerShutdown);
process.on("SIGTERM", handleServerShutdown);
