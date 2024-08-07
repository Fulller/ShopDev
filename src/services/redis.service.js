import { redisClient } from "../database/redis.db.js";

const RedisService = {
  otpPath(email) {
    return `otp:${email}`;
  },
  forgotPasswordOTPPath(email) {
    return `forgot_password_otp:${email}`;
  },
  saveOTP({ email, expire = 60, token }) {
    redisClient.set(RedisService.otpPath(email), token, {
      EX: expire,
      NX: true,
    });
  },
  saveFotgotPasswordOTP({ email, expire = 60, token }) {
    redisClient.set(RedisService.forgotPasswordOTPPath(email), token, {
      EX: expire,
      NX: true,
    });
  },
  async getOTP({ email }) {
    return await redisClient.get(RedisService.otpPath(email));
  },
  async getFotgotPasswordOTP({ email }) {
    return await redisClient.get(RedisService.forgotPasswordOTPPath(email));
  },
  async deleteOTP({ email }) {
    return await redisClient.del(RedisService.otpPath(email));
  },
  async deleteFotgotPasswordOTP({ email }) {
    return await redisClient.del(RedisService.forgotPasswordOTPPath(email));
  },
};
export default RedisService;
