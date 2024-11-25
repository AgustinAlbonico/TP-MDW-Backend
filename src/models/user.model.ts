import { model, Schema } from "mongoose";
import { IUser } from "../interfaces";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthdate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
