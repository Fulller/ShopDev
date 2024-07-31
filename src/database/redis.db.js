import env from "../configs/env.config.js";
import { createClient } from "redis";

let redisClient;

async function connectRedis() {
  redisClient = createClient({
    url: env.db.redis,
  });

  redisClient.on("connect", () => console.log("CONNECTED :: REDIS"));
  redisClient.on("error", (err) => console.log("CONNECT FAIL :: REDIS", err));
  await redisClient.connect();
}

export { redisClient, connectRedis };
