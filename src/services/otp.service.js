import RedisService from "./redis.service.js";

const OTPService = {
  generate({ email }) {
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    RedisService.SaveOTP({ email, token });
    return token;
  },
};
export default OTPService;
