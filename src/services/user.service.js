import User from "../models/user.model.js";
import UserRepository from "../models/repositories/user.repo.js";
import MailerSevice from "./mailer.service.js";
import OTPSevice from "./otp.service.js";
import createHttpError from "http-errors";
import env from "../configs/env.config.js";
import { pickAccountData } from "../utils/index.js";
import bcrypt from "bcrypt";
import _ from "lodash";

const UserService = {
  async signUp({ email }) {
    const user = await User.findOne({
      usr_email: email,
      usr_isFromSocial: false,
    });
    if (user) {
      throw createHttpError(400, "Email has existed");
    }
    const token = await OTPSevice.generate({ email });
    const verifyLink = `${env.app.serverUrl}/api/user/email/verify-signup-otp?token=${token}&email=${email}`;
    MailerSevice.sendMailVerifySignUp(email, verifyLink);
  },
  async verifySignUpOTP({ email, token }) {
    await OTPSevice.verify({ email, token });
    const newUser = pickAccountData(
      await UserRepository.createDefaultWithEmail(email)
    );
    return newUser;
  },
  async initAdmin({ email, password }) {
    const admin = await UserRepository.initAdmin({ email, password });
    if (admin) {
      return pickAccountData(admin);
    }
    return null;
  },
  async logIn({ email, password }) {
    const user = await User.findOne({
      usr_email: email,
      usr_isFromSocial: false,
    });
    if (!user) {
      throw createHttpError(404, "Email not found");
    }
    const isValidPassowrd = await bcrypt.compare(password, user.usr_password);
    if (!isValidPassowrd) {
      throw createHttpError(401, "Invalid password");
    }
    return pickAccountData(
      await user.populate({
        path: "usr_role",
        select: "_id rol_name",
      })
    );
  },
  async signUpFromSocial(profile) {
    return pickAccountData(await UserRepository.createFromSocial(profile));
  },
};
export default UserService;
