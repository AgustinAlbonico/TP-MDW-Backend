import { Schema, model } from "mongoose";
import { ITodo } from "../interfaces/todo.interface";

const TodoSchema: Schema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    tags: {type: [String], default: []},
    isPinned: { type:Boolean, default: false},
    createdOn: {type:Date, default: new Date().getTime()},
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  }
);

export const Todo = model<ITodo>("Todo", TodoSchema);
