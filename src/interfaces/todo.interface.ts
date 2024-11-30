import { Schema, Document } from "mongoose";

export interface ITodo extends Document{
  title: string;
  description: string;
  completed: boolean;
  user: Schema.Types.ObjectId;
}
