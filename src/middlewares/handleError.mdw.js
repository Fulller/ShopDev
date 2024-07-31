import logger from "../logger/index.js";

function handleError(err, req, res, next) {
  logger.error(err.message, { req });
  return res.fly({
    status: err.status || 500,
    message: err.message,
    code: err.code,
  });
}
export default handleError;
