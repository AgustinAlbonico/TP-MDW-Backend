import mongoose, { Schema, Document } from "mongoose";
import { ITodo } from "../interfaces/todo.interface";

const TodoSchema: Schema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITodo>("Todo", TodoSchema);
