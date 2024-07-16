import { statusObj } from "../utils/index.js";

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
export default responseFlying;
