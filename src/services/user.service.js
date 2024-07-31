import User from "../models/user.model.js";
import UserRepository from "../models/repositories/user.repo.js";
import MailerSevice from "./mailer.service.js";
import OTPSevice from "./otp.service.js";
import createHttpError from "http-errors";
import env from "../configs/env.config.js";
import _ from "lodash";

const UserService = {
  async signUp({ email }) {
    const user = await User.findOne({ usr_email: email });
    if (user) {
      throw createHttpError(400, "Email has existed");
    }
    const token = await OTPSevice.generate({ email });
    const verifyLink = `${env.app.serverUrl}/api/user/verify-signup-otp?token=${token}&email=${email}`;
    MailerSevice.sendMailVerifySignUp(email, verifyLink);
  },
  async verifySignUpOTP({ email, token }) {
    await OTPSevice.verify({ email, token });
    const newUser = _.pick(await UserRepository.createDefaultWithEmail(email), [
      "_id",
      "usr_name",
      "usr_email",
      "usr_role",
    ]);
    return newUser;
  },
  async initAdmin({ email, password }) {
    const admin = await UserRepository.initAdmin({ email, password });
    if (admin) {
      return _.pick(admin, ["_id", "usr_name", "usr_email", "usr_role"]);
    }
    return null;
  },
};
export default UserService;
