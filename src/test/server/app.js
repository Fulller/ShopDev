import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import route from "./route.js";

const app = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(route);

const PORT = 8000;
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`APP RUNNING ON PORT ::  ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log("EXIT SERVER EXPRESS"));
});
