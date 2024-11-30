import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from './routes/user.routes'
import { errorHandler } from "./middlewares/errorHandler.middleware";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

//Aca agregar las rutas

app.use('/users', userRoutes)

//Aca agregar el middleware para controlar errores

app.use(errorHandler)

export default app;
