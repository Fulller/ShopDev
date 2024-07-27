import env from "../configs/env.config.js";
import { createClient } from "redis";

let redisClient;

async function initRedis() {
  redisClient = createClient({
    url: env.db.redis,
  });

  redisClient.on("error", (err) => console.log("Redis Client Error", err));

  await redisClient.connect();
}

export { redisClient, initRedis };
