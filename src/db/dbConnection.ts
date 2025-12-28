import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnection = async () => {
  await mongoose.connect(process.env.DB_CONNECTION_STRING as string)
    .then(() => console.log("Connection established successfully!"))
    .catch((err) => console.log("Connection failed!", err.message))
}