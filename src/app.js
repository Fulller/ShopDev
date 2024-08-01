import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import router from "./routes/index.js";
import connectMongoDB from "./database/mongodb.db.js";
import { connectRedis } from "./database/redis.db.js";
import initApp from "./helpers/init.helper.js";
import { initAccessControl } from "./configs/accesscontrol.config.js";
import { connectS3, configureProxyS3 } from "./configs/aws.s3.config.js";
import {
  configureCloudinary,
  configureProxyCloudinary,
} from "./configs/cloudinary.config.js";

const app = express();

await Promise.all([connectMongoDB(), connectRedis()]);
await initApp();
await Promise.all([
  initAccessControl(),
  configureCloudinary(),
  configureProxyCloudinary(app),
  connectS3(),
  configureProxyS3(app),
]);

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

export default app;
