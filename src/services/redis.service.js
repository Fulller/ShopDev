import { redisClient } from "../database/redis.db.js";

const RedisService = {
  SaveOTP({ email, expire = 60, token }) {
    redisClient.set(`otp:${email}`, token, {
      EX: expire,
      NX: true,
    });
  },
};
export default RedisService;
