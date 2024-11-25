import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

//Aca agregar las rutas

//Aca agregar el middleware para controlar errores

export default app;
