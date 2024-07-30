import RedisService from "./redis.service.js";
import createHttpError from "http-errors";

const OTPService = {
  generate({ email }) {
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    RedisService.saveOTP({ email, token });
    return token;
  },
  async verify({ email, token }) {
    const storedToken = await RedisService.getOTP({ email });
    if (!storedToken) {
      throw createHttpError(404, "OTP not found");
    }
    if (storedToken != token) {
      throw createHttpError(404, "OTP was wrong");
    }
    await RedisService.deleteOTP({ email });
  },
};
export default OTPService;
