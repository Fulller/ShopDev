import schedule from "node-schedule";
import axios from "axios";
import env from "../configs/env.config.js";

const serverUrl = env.app.serverUrl;

const keepAlive = (isAlwaysLive = 0) => {
  if (isAlwaysLive == 0) {
    return;
  }
  console.log("MODE :: ALWAY_LIVES :: ON");
  schedule.scheduleJob("* * * * *", async () => {
    try {
      const response = await axios.get(`${serverUrl}/ping`);
    } catch (err) {
      console.error("Error sending scheduled request");
    }
  });
};

export { keepAlive };
