import { Schema, Document } from "mongoose";

export interface ITodo extends Document{
  title: string;
  description: string;
  tags: [string];
  isPinned: boolean;
  completed: boolean;
  createdOn: Date;
  user: Schema.Types.ObjectId;
}
