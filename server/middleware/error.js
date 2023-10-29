import ErrorHandlers from "../utils/ErrorHandler";
// import { NextFunction, Request, Response } from "express";

export const ErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.mesaage = err.message || "Internal server error";

  //wrong mobgobd Id
  if (err.name === "CastError") {
    const message = `Resource not found.`;
    err = new ErrorHandlers(message, 400);
  }

  //duplicate key error
  if (err.code === 11000) {
    const message = `${Object.keys(err.keyValue)} already exists`;
    err = new ErrorHandlers(message, 400);
  }

  // wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Invalid token`;
    err = new ErrorHandlers(message, 401);
  }

  //jwt expired error
  if (err.name === "TokenExpiredError") {
    const message = `Your session has expired`;
    err = new ErrorHandlers(message, 401);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
