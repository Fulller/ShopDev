import app from "./src/app.js";
import env from "./src/configs/env.config.js";
import { keepAlive } from "./src/helpers/scheduler.helper.js";

const PORT = env.app.port;
const isAlwaysLive = env.app.alwaysLive;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`APP :: RUNNING :: ${PORT}`);
  keepAlive(isAlwaysLive);
});

process.on("SIGINT", () => {
  server.close(() => console.log("APP :: EXIT"));
});
