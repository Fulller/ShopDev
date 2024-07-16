import _ from "lodash";

function removeNullUndefined(obj) {
  return _.transform(obj, (result, value, key) => {
    if (_.isObject(value)) {
      const nested = removeNullUndefined(value);
      if (!_.isEmpty(nested)) {
        result[key] = nested;
      }
    } else if (value !== null && value !== undefined) {
      result[key] = value;
    }
  });
}
export default removeNullUndefined;
