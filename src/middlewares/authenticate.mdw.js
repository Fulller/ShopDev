import { JWTService } from "../services/index.js";
import { HEADER } from "../configs/const.config.js";
import createHttpError from "http-errors";
import _ from "lodash";

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

export default authenticate;
