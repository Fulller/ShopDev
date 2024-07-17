import _ from "lodash";

function convertToListGrant(roles) {
  return _.reduce(
    roles,
    (grants, { rol_name, rol_grants }) => {
      return _.concat(
        grants,
        _.map(rol_grants, (grant) =>
          _.chain(grant)
            .set("role", rol_name)
            .set("resource", grant.resource.src_name)
            .omit(["_id"])
            .value()
        )
      );
    },
    []
  );
}
export default convertToListGrant;
