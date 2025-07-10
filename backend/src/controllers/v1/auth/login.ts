import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { logger } from "@/lib/winston";
import config from "@/config";

import User from "@/models/user";
import Token from "@/models/token";

import type { Request, Response } from "express";
import type { iUser } from "@/models/user";
import { Environment } from "@/constants/global";

type UserData = Pick<iUser, "email" | "password">;

const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body as UserData;

        const user = await User.findOne({ email })
            .select("name email password")
            .lean()
            .exec();

        if (!user) {
            res.status(401).json({
                code: "NotFound",
                message: "User not found!",
            });
            return;
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        await Token.create({
            userId: user._id,
            token: refreshToken,
        });
        logger.info("Refresh token created for user", {
            userId: user._id,
            token: refreshToken,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: config.NODE_ENV === Environment.PROD,
            sameSite: "strict",
        });

        res.status(200).json({
            user: {
                name: user.name,
                email: user.email,
            },
            accessToken,
        });

        logger.info("User logged in successfully", {
            userId: user._id,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({
            code: "ServerError",
            message: "Internal server error",
            error,
        });

        logger.error("Error while logging in user", error);
    }
};

export default login;
