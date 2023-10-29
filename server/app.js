import express from "express";
export const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
require("dotenv").config();
import { ErrorMiddleware } from "./middleware/error";

//body parser
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 1000 })
);
app.use(cookieParser());

//cors
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// testing api
app.get("/test", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

//unknown route
app.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.status = 404;
  next(err);
});

// use error middleware
app.use(ErrorMiddleware);
