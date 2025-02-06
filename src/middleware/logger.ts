import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { logType } from "../types/logType";
import { NextFunction, Request, Response } from "express";

export const logEvent = async (message: string, type: logType) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  let filename: string = "";

  switch (type) {
    case "error":
      filename = `error${dateTime.slice(0, 6)}.log`;
      break;
    case "query":
      filename = `query${dateTime.slice(0, 8)}.log`;
      break;
    case "mutation":
      filename = `mutation${dateTime.slice(0, 8)}.log`;
      break;
    case "logSucces":
      filename = `login${dateTime.slice(0, 6)}.log`;
      break;
    case "logError":
      filename = `loginFailed${dateTime.slice(0, 6)}.log`;
      break;
    default:
      filename = `error${dateTime.slice(0, 6)}.log`;
  }

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", filename),
      logItem
    );
  } catch (err) {
    console.error(err);
  }
};

const logger = (req: Request, res: Response, next: NextFunction) => {
  req.method === "GET"
    ? logEvent(`${req.method}\t${req.url}\t${req.headers.origin}`, "query")
    : logEvent(`${req.method}\t${req.url}\t${req.headers.origin}`, "mutation");
  next();
};

export default logger;
