import User from "../user.model.js";
import RoleReposiroty from "./role.repo.js";
import { ROLE_NAMES } from "../../configs/const.config.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

const UserRepository = {
  async createDefaultWithEmail(email) {
    const user = await User.findOne({ usr_email: email });
    if (user) {
      throw createHttpError(400, `User with email ${email} has existed`);
    }
    const [usr_role, usr_password] = await Promise.all([
      RoleReposiroty.findRoleIdByName(ROLE_NAMES.USER),
      bcrypt.hash(email, 10),
    ]);
    const newUser = await User.create({
      usr_name: email,
      usr_password,
      usr_email: email,
      usr_role,
    });
    return await newUser.populate({
      path: "usr_role",
      select: "_id rol_name",
    });
  },
  async initAdmin({ email, password }) {
    const admin = await User.findOne({ usr_email: email });
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
};
export default UserRepository;
