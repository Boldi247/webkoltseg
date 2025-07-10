import { Router } from "express";

import bcrypt from "bcrypt";

import register from "@/controllers/v1/auth/register";
import login from "@/controllers/v1/auth/login";

import { body, cookie } from "express-validator";
import validationError from "@/middlewares/validationError";

import User from "@/models/user";
import refreshToken from "@/controllers/v1/auth/refreshToken";
import logout from "@/controllers/v1/auth/logout";
import authenticate from "@/middlewares/authenticate";

const router = Router();

router.post(
    "/register",
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email adress")
        .isLength({ max: 50 })
        .withMessage("Email must be less than 50 characters")
        .custom(async (value) => {
            const userExists = await User.exists({
                email: value,
            });

            if (userExists) {
                throw new Error("User already exists");
            }
        }),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    validationError,
    register,
);

router.post(
    "/login",
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isLength({ max: 50 })
        .withMessage("Email must be less than 50 characters")
        .isEmail()
        .withMessage("Invalid email adress")
        .custom(async (value) => {
            const userExists = await User.exists({
                email: value,
            });

            if (!userExists) {
                throw new Error("User email or password is invalid!");
            }
        }),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters")
        .custom(async (value, { req }) => {
            const { email } = req.body;

            const user = await User.findOne({
                email,
            })
                .select("password")
                .lean()
                .exec();

            if (!user) {
                throw new Error("User email or password is invalid!");
            }

            const passwordMatch = await bcrypt.compare(value, user.password);

            if (!passwordMatch) {
                throw new Error("User email or password is invalid!");
            }
        }),
    login,
);

router.post(
    "/refresh-token",
    cookie("refreshToken")
        .notEmpty()
        .withMessage("Refresh token required")
        .isJWT()
        .withMessage("Invalid refresh token"),
    validationError,
    refreshToken,
);

router.post("/logout", authenticate, logout);

export default router;
