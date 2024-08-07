import User from "../user.model.js";
import RoleReposiroty from "./role.repo.js";
import { ROLE_NAMES } from "../../configs/const.config.js";
import { pickAccountData } from "../../utils/index.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

const UserRepository = {
  async findUserFromLocalByEmail(email) {
    return User.findOne({
      usr_email: email,
      usr_isFromSocial: false,
    });
  },
  async createDefaultWithEmail(email, password) {
    const user = await UserRepository.findUserFromLocalByEmail(email);
    if (user) {
      throw createHttpError(400, `User with email ${email} has existed`);
    }
    const [usr_role, usr_password] = await Promise.all([
      RoleReposiroty.findRoleIdByName(ROLE_NAMES.USER),
      bcrypt.hash(password, 10),
    ]);
    return await User.create({
      usr_name: email,
      usr_password,
      usr_email: email,
      usr_role,
    });
  },
  async initAdmin({ email, password }) {
    const admin = await UserRepository.findUserFromLocalByEmail(email);
    if (admin) {
      return null;
    }
    const [usr_role, usr_password] = await Promise.all([
      RoleReposiroty.findRoleIdByName(ROLE_NAMES.ADMIN),
      bcrypt.hash(password, 10),
    ]);
    const newAdmin = await User.create({
      usr_name: email,
      usr_password,
      usr_email: email,
      usr_role,
      usr_slug: email,
    });
    return await newAdmin.populate({
      path: "usr_role",
      select: "_id rol_name",
    });
  },
  async createFromSocial(profile) {
    let user = await User.findOne({
      usr_provider: profile.usr_provider,
      usr_isFromSocial: true,
    });
    if (!user) {
      const usr_role = await RoleReposiroty.findRoleIdByName(ROLE_NAMES.USER);
      user = await User.create({ ...profile, usr_role });
    }
    return await UserRepository.userFormatForToken(user);
  },
  async newPasswordForForgot({ email, password }) {
    const user = await UserRepository.findUserFromLocalByEmail(email);
    if (!user) {
      throw createHttpError(400, `User with email ${email} dose not exist`);
    }
    user.usr_password = await bcrypt.hash(password, 10);
    await user.save();
  },
  async userFormatForToken(user) {
    return pickAccountData(
      await user.populate({
        path: "usr_role",
        select: "_id rol_name",
      })
    );
  },
};
export default UserRepository;
