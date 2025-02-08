import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import connectDB from "./configs/dbConnect";
import cors from "cors";
import corsOptions from "./configs/corsOptions";
import logger, { logEvent } from "./middleware/logger";
import errorhandler from "./middleware/errorhandler";
import cookieParser from "cookie-parser";
import serviceRouter from "./routes/serviceRoute";

const app = express();
const PORT = process.env.PORT || "3500";

dotenv.config();

connectDB();

app.use(cors(corsOptions));

app.use(logger);

app.use(express.json());

app.use(cookieParser());

app.use("/service", serviceRouter);

app.all("*", (req, res) => {
  res.status(404).json({ message: "404 Not Found" });
});

app.use(errorhandler);

mongoose.connection.once("open", () => {
  app.listen(PORT, () => console.log("Server running on port:" + PORT));
});

mongoose.connection.on("error", (err: Error) => {
  logEvent(err?.message, "error");
});
