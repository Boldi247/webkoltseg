import { logger } from "@/lib/winston";
import config from "@/config";
import { Request, Response } from "express";

import User from "@/models/user";
import Token from "@/models/token";
import { iUser } from "@/models/user";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { Environment } from "@/constants/global";

type UserData = Pick<iUser, "name" | "email" | "password">;

const register = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body as UserData;

    try {
        const newUser = await User.create({
            email,
            name,
            password,
        });

        //Generate access and refresh tokens for user
        const accessToken = generateAccessToken(newUser._id);
        const refreshToken = generateRefreshToken(newUser._id);

        //Store refresh token in database
        await Token.create({
            token: refreshToken,
            userId: newUser._id,
        });
        logger.info("🔑 New refresh token created and stored for user", {
            userId: newUser._id,
            token: refreshToken,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: config.NODE_ENV === Environment.PROD,
            sameSite: "strict",
        });

        res.status(200).json({
            message: "User registered successfully",
            status: "ok",
            user: {
                name,
                email,
            },
            accessToken,
        });

        logger.info(
            `✍️ User <${email}> registered successfully with id <${newUser._id}>`,
        );
    } catch (error) {
        res.status(500).json({
            code: "ServerError",
            message: "Internal server error",
            error,
        });

        logger.error("Error during user registration", error);
    }
};

export default register;
