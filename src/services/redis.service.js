import { redisClient } from "../database/redis.db.js";

const RedisService = {
  otpPath(email) {
    return `otp:${email}`;
  },
  saveOTP({ email, expire = 60, token }) {
    redisClient.set(RedisService.otpPath(email), token, {
      EX: expire,
      NX: true,
    });
  },
  async getOTP({ email }) {
    return await redisClient.get(RedisService.otpPath(email));
  },
  async deleteOTP({ email }) {
    return await redisClient.del(RedisService.otpPath(email));
  },
};
export default RedisService;
