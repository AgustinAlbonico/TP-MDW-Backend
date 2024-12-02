import express from "express";
const userRouter = express.Router();
import { getUser, login, register } from "../controllers";
import validateSchema from "../middlewares/schemaValidation.middleware";
import { loginSchema, registerSchema } from "../controllers/schemaValidations";
import { checkAuth } from "../middlewares/checkAuth.middleware";

userRouter.post("/register", validateSchema(registerSchema), register);
userRouter.post("/login", validateSchema(loginSchema), login);
userRouter.get("/user-info", checkAuth, getUser);


export {userRouter};
