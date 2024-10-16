import mongoose from "mongoose";
import { MONGODB_URI } from "./env";

const connectDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conexion a la DB exitosa");
  } catch (error) {
    console.log("Error conectando a la DB");
  }
};

export default connectDb;
