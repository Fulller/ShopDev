import _ from "lodash";
import { Types } from "mongoose";

function toObjectId(id) {
  return new Types.ObjectId(id);
}
export default toObjectId;
