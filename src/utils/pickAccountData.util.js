import _ from "lodash";

function pickAccountData(profile) {
  const pick = [
    "_id",
    "email",
    "name",
    "roles",
    "usr_name",
    "usr_avatar",
    "usr_email",
    "usr_role",
    "usr_provider",
    "usr_isFromSocial",
  ];
  return _.pick(profile, pick);
}

export default pickAccountData;
