import Role from "../models/role.model.js";
import Resource from "../models/resource.model.js";
import _ from "lodash";

const RBACService = {
  async newRole({
    rol_name,
    rol_slug,
    rol_status,
    rol_description,
    rol_grants = [],
  }) {
    return await Role.create({
      rol_name,
      rol_slug,
      rol_status,
      rol_description,
      rol_grants,
    });
  },
  async newResource({ src_name, src_slug, src_description }) {
    return Resource.create({ src_name, src_slug, src_description });
  },
  async addGrantToRole({ role_id, resource, action, possession, attribute }) {
    const role = await Role.findById(role_id);
    role.rol_grants.push({ resource, action, possession, attribute });
    await role.save();
    return role;
  },
  async listGrant() {
    const roles = await Role.find().populate("rol_grants.resource").lean();
    return _.reduce(
      roles,
      (grants, { rol_name, rol_grants }) => {
        return _.concat(
          grants,
          _.map(rol_grants, (grant) =>
            _.chain(grant)
              .set("role", rol_name)
              .set("resource", grant.resource.src_name)
              .omit(["_id"])
              .value()
          )
        );
      },
      []
    );
  },
};

export default RBACService;
