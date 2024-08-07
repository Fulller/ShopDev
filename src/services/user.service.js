import User from "../models/user.model.js";
import UserRepository from "../models/repositories/user.repo.js";
import MailerSevice from "./mailer.service.js";
import OTPService from "./otp.service.js";
import createHttpError from "http-errors";
import env from "../configs/env.config.js";
import { pickAccountData, generateRandomPassword } from "../utils/index.js";
import bcrypt from "bcrypt";
import _ from "lodash";

const UserService = {
  async signUp({ email }) {
    const user = await UserRepository.findUserFromLocalByEmail(email);
    if (user) {
      throw createHttpError(400, "Email has existed");
    }
    const token = await OTPService.generateOTP({ email });
    const verifyLink = `${env.app.serverUrl}/api/user/email/verify-signup-otp?token=${token}&email=${email}`;
    MailerSevice.sendMailVerifySignUp(email, verifyLink);
  },
  async verifySignUpOTP({ email, token }) {
    await OTPService.verifyOTP({ email, token });
    const defaultPassword = generateRandomPassword();
    const newUser = await UserRepository.createDefaultWithEmail(
      email,
      defaultPassword
    );
    MailerSevice.sendMailWelcome(email, defaultPassword);
    return await UserRepository.userFormatForToken(newUser);
  },
  async beforeForgotPassword({ email }) {
    const user = await UserRepository.findUserFromLocalByEmail(email);
    if (!user) {
      throw createHttpError(400, "Email does not exist");
    }
    const token = await OTPService.generateForgotPasswordOTP({ email });
    MailerSevice.sendMailForgotPaswordOTP(email, token);
  },
  async afterForgotPassword({ email, token, password }) {
    const user = await UserRepository.findUserFromLocalByEmail(email);
    if (!user) {
      throw createHttpError(400, "Email does not exist");
    }
    await OTPService.verifyForgotPasswordOTP({ email, token });
    await UserRepository.newPasswordForForgot({ email, password });
    return await UserRepository.userFormatForToken(user);
  },
  async initAdmin({ email, password }) {
    const admin = await UserRepository.initAdmin({ email, password });
    if (admin) {
      return pickAccountData(admin);
    }
    return null;
  },
  async logIn({ email, password }) {
    const user = await UserRepository.findUserFromLocalByEmail(email);
    if (!user) {
      throw createHttpError(404, "Email not found");
    }
    const isValidPassowrd = await bcrypt.compare(password, user.usr_password);
    if (!isValidPassowrd) {
      throw createHttpError(401, "Invalid password");
    }
    return await UserRepository.userFormatForToken(user);
  },
  async signUpFromSocial(profile) {
    return pickAccountData(await UserRepository.createFromSocial(profile));
  },
};
export default UserService;
