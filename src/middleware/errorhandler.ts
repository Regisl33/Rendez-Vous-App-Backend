import { NextFunction, Request, Response } from "express";
import { logEvent } from "./logger";

const errorhandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logEvent(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "error"
  );

  const status = res.statusCode ? res.statusCode : 500;

  res.status(status).json({ message: err.message, isError: true });
};

export default errorhandler;
