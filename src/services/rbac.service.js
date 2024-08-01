import Role from "../models/role.model.js";
import Resource from "../models/resource.model.js";
import {
  toObjectId,
  convertToListGrant,
  removeNullUndefined,
} from "../utils/index.js";
import createHttpError from "http-errors";
import _ from "lodash";

const RBACService = {
  async findByName(src_name) {
    return await Resource.findOne({ src_name });
  },
  async newRole({
    rol_name,
    rol_slug,
    rol_status,
    rol_description,
    rol_grants = [],
  }) {
    const role = await Role.findOne({ rol_name });
    if (role) {
      return null;
    }
    return await Role.create({
      rol_name,
      rol_slug,
      rol_status,
      rol_description,
      rol_grants,
    });
  },
  async newResource({ src_name, src_slug, src_description }) {
    return await Resource.create({ src_name, src_slug, src_description });
  },
  async addGrantToRole({ role_id, resource, action, possession, attribute }) {
    const role = await Role.findById(role_id);
    if (!role) {
      throw createHttpError(404, "Role or grant not found");
    }
    role.rol_grants.push({ resource, action, possession, attribute });
    await role.save();
    return role;
  },
  async removeGrantFromRole({ role_id, grant_id }) {
    const role = await Role.findByIdAndUpdate(
      toObjectId(role_id),
      { $pull: { rol_grants: { _id: toObjectId(grant_id) } } },
      { new: true }
    )
      .populate("rol_grants.resource")
      .lean();
    if (!role) {
      throw createHttpError(404, "Role or grant not found");
    }
    return convertToListGrant([role]);
  },
  async updateGrantInRole({ role_id, grant_id, updateData }) {
    const { resource, action, possession, attribute } =
      removeNullUndefined(updateData);
    const role = await Role.findOneAndUpdate(
      { _id: role_id, "rol_grants._id": grant_id },
      {
        $set: {
          "rol_grants.$.resource": resource,
          "rol_grants.$.action": action,
          "rol_grants.$.possession": possession,
          "rol_grants.$.attribute": attribute,
        },
      },
      { new: true }
    )
      .populate("rol_grants.resource")
      .lean();
    if (!role) {
      throw createHttpError(404, "Role or grant not found");
    }
    return convertToListGrant([role]);
  },
  async listGrant() {
    const roles = await Role.find().populate("rol_grants.resource").lean();
    return convertToListGrant(roles);
  },
};

export default RBACService;
