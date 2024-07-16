import _ from "lodash";

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
export default getUnselectData;
