import RedisService from "./redis.service.js";
import createHttpError from "http-errors";

const OTPService = {
  generateOTP({ email }) {
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    RedisService.saveOTP({ email, token });
    return token;
  },
  generateForgotPasswordOTP({ email }) {
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    RedisService.saveFotgotPasswordOTP({ email, token, expire: 120 });
    return token;
  },
  async verifyOTP({ email, token }) {
    const storedToken = await RedisService.getOTP({ email });
    if (!storedToken) {
      throw createHttpError(404, "OTP not found");
    }
    if (storedToken != token) {
      throw createHttpError(404, "OTP was wrong");
    }
    await RedisService.deleteOTP({ email });
  },
  async verifyForgotPasswordOTP({ email, token }) {
    const storedToken = await RedisService.getFotgotPasswordOTP({ email });
    if (!storedToken) {
      throw createHttpError(404, "Forgot password OTP not found");
    }
    if (storedToken != token) {
      throw createHttpError(404, "Forgot password OTP was wrong");
    }
    await RedisService.deleteFotgotPasswordOTP({ email });
  },
};
export default OTPService;
