import _ from "lodash";
import { Types } from "mongoose";
import slugify from "slugify";

function pickAccountData(profile) {
  const pick = ["_id", "email", "name", "roles"];
  return _.pick(profile, pick);
}
function getSelectData(select = []) {
  return _.reduce(
    select,
    (result, field) => {
      result[field] = 1;
      return result;
    },
    {}
  );
}
function getUnselectData(unselect = []) {
  return _.reduce(
    unselect,
    (result, field) => {
      result[field] = 0;
      return result;
    },
    {}
  );
}
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
function updateNested(obj) {
  const final = {};
  Object.keys(obj).forEach((k) => {
    if (typeof obj[k] == "object" && !Array.isArray(obj[k])) {
      const response = updateNested(obj[k]);
      Object.keys(response).forEach((a) => {
        final[`${k}.${a}`] = response[a];
      });
    } else {
      final[k] = obj[k];
    }
  });
  return final;
}
function toObjectId(id) {
  return new Types.ObjectId(id);
}
function convertToSlug(text) {
  return slugify(text.replace(/[^\w\s.]/gi, ""), {
    replacement: "_", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: "vi", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
}

export {
  pickAccountData,
  getSelectData,
  getUnselectData,
  removeNullUndefined,
  updateNested,
  toObjectId,
  convertToSlug,
};
