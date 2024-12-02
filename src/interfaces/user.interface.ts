import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  lastname: string;
  email: string;
  birthdate: Date;
  password: string;
  comparePassword(password: string): Promise<Boolean>;
}
