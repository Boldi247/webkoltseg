import mongoose, { ConnectOptions } from "mongoose";
import config from "@/config";
import { logger } from "@/lib/winston";

const clientOptions: ConnectOptions = {
    dbName: "webkoltseg",
    appName: "WebKoltseg",
    serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
    },
};

export const connectToDatabase = async (): Promise<void> => {
    if (!config.MONGO_URI) {
        throw new Error("MongoDB URI is not defined in the configuration.");
    }

    try {
        await mongoose.connect(config.MONGO_URI, clientOptions);

        logger.info("Connected to the database successfully.", {
            uri: config.MONGO_URI,
            options: clientOptions,
        });
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }

        logger.error("Error connecting to the database.", error);
    }
};

export const disconnectFromDatabase = async (): Promise<void> => {
    try {
        await mongoose.disconnect();

        logger.info("Disconnected from the database successfully.", {
            uri: config.MONGO_URI,
            options: clientOptions,
        });
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }

        logger.error("Error disconnecting from database.", error);
    }
};
