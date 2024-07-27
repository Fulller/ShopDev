import { statusObj } from "../utils/index.js";
import logger from "../logger/index.js";

function responseFlying(req, res, next) {
  res.fly = ({ status, code, message, metadata, option }) => {
    logger.log(message, { req, metadata });
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
export default responseFlying;
