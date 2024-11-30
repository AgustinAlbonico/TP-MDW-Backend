import express from "express"
import { register } from "../controllers/user.controller";
import { validateSchema } from "../middlewares/schemaValidation.middleware";
import { registerSchema } from "../controllers/schemaValidations";
const router = express.Router();

router.post('/register', validateSchema(registerSchema) ,register)

export default router