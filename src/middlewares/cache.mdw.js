import { redisClient } from "../database/redis.db.js";
import _ from "lodash";

function cache(fly = { status: 200, message: "CACHE REDIS" }) {
  return async function (req, res, next) {
    const cacheKey = `cache:${req.originalUrl}`;
    try {
      const data = await redisClient.get(cacheKey);

      if (data !== null) {
        console.log("Fetching from cache:", cacheKey);
        return res.fly(
          _.chain(fly)
            .set("option", { cached: true })
            .set("metadata", JSON.parse(data))
            .value()
        );
      } else {
        next();
      }
    } catch (err) {
      console.error("Redis error:", err);
      next();
    }
  };
}

export default cache;
