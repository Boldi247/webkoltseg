import jwt from "jsonwebtoken";

import config from "@/config";

import { Types } from "mongoose";

export const generateAccessToken = (userId: Types.ObjectId) => {
    return jwt.sign({ userId }, config.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: config.ACCESS_TOKEN_EXPIRY,
        subject: "accessApi",
    });
};

export const generateRefreshToken = (userId: Types.ObjectId) => {
    return jwt.sign({ userId }, config.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: config.REFRESH_TOKEN_EXPIRY,
        subject: "refreshToken",
    });
};
