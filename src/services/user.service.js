import User from "../models/user.model.js";
import MailerSevice from "./mailer.service.js";
import OTPSevice from "./otp.service.js";
import createHttpError from "http-errors";
import env from "../configs/env.config.js";

const UserService = {
  async signUp({ email }) {
    const user = await User.findOne({ usr_email: email });
    if (user) {
      throw createHttpError(400, "Email has existed");
    }
    const token = await OTPSevice.generate({ email });
    const verifyLink = `${env.app.serverUrl}/welcome-back?token=${token}`;
    MailerSevice.sendMailVerifySignUp(email, verifyLink);
  },
};
export default UserService;
