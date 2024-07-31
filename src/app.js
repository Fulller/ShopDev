import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import router from "./routes/index.js";
import MongoDB from "./database/mongodb.db.js";
import { initRedis } from "./database/redis.db.js";
import { initAccessControl } from "./configs/accesscontrol.config.js";
import initApp from "./helpers/init.helper.js";

await MongoDB.getInstance();
await Promise.all([initAccessControl(), initRedis(), initApp()]);

const app = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

export default app;
