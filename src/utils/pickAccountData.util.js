import _ from "lodash";

function pickAccountData(profile) {
  const pick = ["_id", "email", "name", "roles"];
  return _.pick(profile, pick);
}
export default pickAccountData;
