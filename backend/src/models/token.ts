import { Schema, model, Types } from "mongoose";

interface iToken {
    token: string;
    userId: Types.ObjectId;
}

const tokenSchema = new Schema<iToken>({
    token: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});

export default model<iToken>("Token", tokenSchema);
