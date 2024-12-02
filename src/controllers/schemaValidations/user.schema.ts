import Joi from "joi";
import { IUser } from "../../interfaces";

const registerSchema = Joi.object<IUser>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).required(),
  lastname: Joi.string().min(2).required(),
  birthdate: Joi.date().less("now").required(),
});

const loginSchema = Joi.object<IUser>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export { registerSchema, loginSchema };
