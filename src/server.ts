import app from "./app";
import connectDb from "./config/connectDb";
import { PORT } from "./config/env";

const startServer = async () => {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`Servidor corriento en el puerto ${PORT}`);
    });
  } catch (error) {
    console.log("Error al arrancar el servidor");
  }
};

startServer();
