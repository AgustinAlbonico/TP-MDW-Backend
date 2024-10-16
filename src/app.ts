import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

//Aca agregar las rutas

//Aca agregar el middleware para controlar errores 

export default app
