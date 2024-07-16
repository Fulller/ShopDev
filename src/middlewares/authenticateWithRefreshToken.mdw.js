import { JWTService } from "../services/index.js";
import { HEADER } from "../configs/const.config.js";
import createHttpError from "http-errors";
import _ from "lodash";

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
export default authenticateWithRefreshToken;
