import _ from "lodash";
import createHttpError from "http-errors";

function checkPermissionAPIKey(permission) {
  return (req, res, next) => {
    try {
      const permissions = _.get(req, "apiKey.permissions", []);
      if (_.isEmpty(permissions)) {
        throw createHttpError(403, "Permission denied code-1");
      }
      const validPermission = _.includes(permissions, permission);
      if (!validPermission) {
        throw createHttpError(403, "Permission denied code-2");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}
export default checkPermissionAPIKey;
