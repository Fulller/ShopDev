import statusObj from "../utils/status/index.js";
import { APIKeyService, JWTService } from "../services/index.js";
import { HEADER } from "../configs/const.config.js";
import createHttpError from "http-errors";
import _ from "lodash";

function responseFlying(req, res, next) {
  res.fly = ({ status, code, message, metadata, option }) => {
    res.status(status).json({
      status: statusObj(status),
      code,
      message,
      metadata,
      option,
    });
  };
  next();
}
function handleError(err, req, res, next) {
  console.log({ err });
  return res.fly({
    status: err.status || 500,
    message: err.message,
    code: err.code,
  });
}
function notFound(req, res, next) {
  next(createHttpError(404, "Not found route"));
}
async function checkAPIKey(req, res, next) {
  try {
    const providedApiKey = req.headers[HEADER.API_KEY];
    const storedApiKey = await APIKeyService.findByKey(providedApiKey);
    if (!storedApiKey) {
      throw createHttpError(403, "Invalid API key");
    }
    req.apiKey = storedApiKey;
    next();
  } catch (err) {
    next(err);
  }
}
function checkPermission(permission) {
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
function validate(schema, fileds = "body", pick) {
  return (req, res, next) => {
    let data = _.get(req, fileds);
    if (pick) {
      data = _.pick(data, pick);
    }
    let { error } = schema.validate(data);
    if (error) {
      error.details = error.details.map((d) => ({
        message: d.message.replace(/['"]/g, ""),
        path: d.path,
      }));
      return next(createHttpError(400, error.details[0].message));
    }
    next();
  };
}
function controller(fnController) {
  return (req, res, next) => {
    fnController(req, res, next).catch(next);
  };
}
async function authenticate(req, res, next) {
  // const user = req.headers[HEADER.CLIENT_ID];
  // if (!user) return next(createHttpError(403, "Invalid request 1"));

  // const tokenStored = await JWTService.refresh.findByUser(user);
  // if (!tokenStored) return next(createHttpError(403, "Not found token stored"));

  const accessToken = req.headers[HEADER.ACCESSTOKEN];
  if (!accessToken) return next(createHttpError(403, "Invalid request 2"));
  try {
    req.user = JWTService.access.verify(accessToken);
    // if (decodeUser._id != user) {
    //   return next(createHttpError(403, "Invalid request 3"));
    // }
  } catch (err) {
    return next(err);
  }
  next();
}
async function authenticateWithRefreshToken(req, res, next) {
  const refreshToken = req.headers[HEADER.REFRESHTOKEN];
  if (!refreshToken)
    return next(createHttpError(403, "There isn't refreshtoken"));
  const user = await JWTService.refresh.verify(refreshToken);
  if (!user) {
    return next(createHttpError(403, "Invalid refreshtoken"));
  }
  req.user = user;
  next();
}

export {
  responseFlying,
  handleError,
  checkAPIKey,
  checkPermission,
  notFound,
  validate,
  controller,
  authenticate,
  authenticateWithRefreshToken,
};
