import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import router from "./routes/index.js";
import MongoDB from "./database/mongodb.db.js";
import env from "./configs/env.config.js";
import { v2 as cloudinary } from "cloudinary";

MongoDB.getInstance();

const app = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
cloudinary.config(env.cloudinary);
app.use(router);

export default app;
