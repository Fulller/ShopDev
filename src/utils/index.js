import _ from "lodash";
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
export { pickAccountData, getSelectData, getUnselectData };
