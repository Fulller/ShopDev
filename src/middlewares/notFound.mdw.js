import createHttpError from "http-errors";

function notFound(req, res, next) {
  next(createHttpError(404, "Not found route"));
}
export default notFound;
