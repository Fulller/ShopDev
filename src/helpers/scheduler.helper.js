import schedule from "node-schedule";
import axios from "axios";
import env from "../configs/env.config.js";

const serverUrl = env.app.serverUrl;

const keepAlive = (isAlwaysLive = 0) => {
  if (isAlwaysLive == 0) {
    console.log("Turn OFF always live mode");
    return;
  }
  console.log("Turn ON always live mode");
  schedule.scheduleJob("* * * * *", async () => {
    try {
      const response = await axios.get(`${serverUrl}/ping`);
      console.log(`Scheduled request sent: ${response.status}`);
    } catch (err) {
      console.error("Error sending scheduled request");
    }
  });
};

export { keepAlive };
