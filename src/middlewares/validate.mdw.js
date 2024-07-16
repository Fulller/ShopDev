import createHttpError from "http-errors";
import _ from "lodash";

function validate(schema, fields = "body", pick) {
  return (req, res, next) => {
    let data;
    if (_.isArray(fields)) {
      data = fields.reduce((acc, field) => {
        const value = _.get(req, field);
        if (value !== undefined) {
          acc = { ...acc, ...value };
        }
        return acc;
      }, {});
    } else {
      data = _.get(req, fields);
    }

    if (pick) {
      data = _.pick(data, pick);
    }

    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      const details = error.details.map((d) => ({
        message: d.message.replace(/['"]/g, ""),
        path: d.path,
      }));
      return next(createHttpError(400, details[0].message));
    }

    next();
  };
}
export default validate;
