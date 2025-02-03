import dotenv from "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/dbConnect";

const app = express();
const PORT = process.env.PORT || "3500";

connectDB();

mongoose.connection.once("open", () => {
  app.listen(PORT, () => console.log("Server running on port:" + PORT));
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});
