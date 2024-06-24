import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js"
import pythonRouter from "./routes/python.routes.js"

const app = express();
dotenv.config();

app.use(
  cors({
    origin: ["*"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    exposedHeaders: ["set-cookie"]
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use( "/api/user" ,userRouter)
app.use( "/api/model" ,pythonRouter)


export { app };