import Role from "../role.model.js";
import { ROLE_NAMES } from "../../configs/const.config.js";
import createHttpError from "http-errors";

const RoleRepository = {
  async findRoleIdByName(name = ROLE_NAMES.USER) {
    const role = await Role.findOne({ rol_name: name }).lean();
    if (!role) {
      throw createHttpError(404, "RoleID not found");
    }
    return role._id;
  },
};

export default RoleRepository;
