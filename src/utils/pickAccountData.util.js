import _ from "lodash";

function pickAccountData(profile) {
  const pick = [
    "_id",
    "email",
    "name",
    "roles",
    "usr_name",
    "usr_email",
    "usr_role",
  ];
  return _.pick(profile, pick);
}
export default pickAccountData;
