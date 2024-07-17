import { getAccessControl } from "../configs/accesscontrol.config.js";

function checkPermission({ action, resource, possession }) {
  return async function (req, res, next) {
    try {
      //   const userRole = req.user.role;
      const userRole = req.query.role;
      const permission = (await getAccessControl()).permission({
        role: userRole,
        action: action,
        resource: resource,
        possession: possession,
      });

      if (permission.granted) {
        next();
      } else {
        return res.fly({ status: 403, message: "Forbidden" });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default checkPermission;
