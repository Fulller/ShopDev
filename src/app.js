import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import router from "./routes/index.js";
import initApp from "./helpers/init.helper.js";
import session from "express-session";
import passport from "passport";
import { connectMongoDB } from "./database/mongodb.db.js";
import { connectRedis } from "./database/redis.db.js";
import { initAccessControl } from "./configs/accesscontrol.config.js";
import { connectS3, configureProxyS3 } from "./configs/aws.s3.config.js";
import {
  configureCloudinary,
  configureProxyCloudinary,
} from "./configs/cloudinary.config.js";
import {
  configureGoogleAuthPassport,
  configureGitHubAuthPassport,
} from "./configs/passport.config.js";
import env from "./configs/env.config.js";

const app = express();

await Promise.all([connectMongoDB(), connectRedis()]);
await initApp();
await Promise.all([initAccessControl(), connectS3()]);

configureProxyS3(app);
configureCloudinary();
configureProxyCloudinary(app);
configureGoogleAuthPassport();
configureGitHubAuthPassport();

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: env.app.sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

export default app;
