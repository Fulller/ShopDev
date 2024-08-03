import { getAccessControl } from "../configs/accesscontrol.config.js";
import createHttpError from "http-errors";
import _ from "lodash";

function checkPermission({ action, resource, possession }) {
  return async function (req, res, next) {
    try {
      const userRole = _.get(req, "user.usr_role.rol_name");
      if (!userRole) {
        throw createHttpError(403, "Check permission :: no role");
      }
      const permission = (await getAccessControl()).permission({
        role: userRole,
        action: action,
        resource: resource,
        possession: possession,
      });
      if (permission.granted) {
        next();
      } else {
        throw createHttpError(403, "Check permission :: invalid");
      }
    } catch (error) {
      next(error);
    }
  };
}
export default checkPermission;
