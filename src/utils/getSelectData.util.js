import _ from "lodash";

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
export default getSelectData;
