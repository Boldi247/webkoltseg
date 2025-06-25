import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export interface iUser {
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<iUser>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            maxlength: [50, "Name must be less than 50 characters"],
            minlength: [3, "Name must be at least 3 characters"],
            trim: true,
            unique: false,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email must be unique"],
            lowercase: true,
            trim: true,
            maxlength: [50, "Email must be less than 50 characters"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
            trim: true,
            select: false,
        },
    },
    {
        timestamps: true,
    },
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default model<iUser>("User", userSchema);
