import { Router } from "express";

import register from "@/controllers/v1/auth/register";
import { body } from "express-validator";
import validationError from "@/middlewares/validationError";

import User from "@/models/user";

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

export default router;
