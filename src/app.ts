import express from "express";
import "dotenv/config"
import cors from "cors";
import { userRouter, todoRouter } from "./routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

//Aca agregar las rutas

app.use("/api/users", userRouter);
app.use("/api/todos", todoRouter);

//Aca agregar el middleware para controlar errores

app.use(errorHandler);

export default app;
