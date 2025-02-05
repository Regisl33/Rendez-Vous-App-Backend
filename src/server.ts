import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import connectDB from "./configs/dbConnect";
import cors from "cors";
import corsOptions from "./configs/corsOptions";
import logger from "./middleware/logger";

const app = express();
const PORT = process.env.PORT || "3500";

dotenv.config();

connectDB();

app.use(cors(corsOptions));

app.use(logger);

mongoose.connection.once("open", () => {
  app.listen(PORT, () => console.log("Server running on port:" + PORT));
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});
