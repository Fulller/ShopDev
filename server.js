import app from "./src/app.js";
import env from "./src/configs/env.config.js";
import { keepAlive } from "./src/helpers/scheduler.helper.js";

const PORT = env.app.port;
const isAlwaysLive = env.app.alwaysLive;

const server = app.listen(PORT, () => {
  console.log(`APP RUNNING ON PORT ::  ${PORT}`);
  keepAlive(isAlwaysLive);
});

process.on("SIGINT", () => {
  server.close(() => console.log("EXIT SERVER EXPRESS"));
});
