import Discount from "../discount.model.js";
import { getUnselectData, getSelectData } from "../../utils/index.js";

const DiscountRepo = {
  async findAllDiscountCode({
    limit = 50,
    page = 1,
    sort = "ctime",
    filter,
    select,
    unselect,
    model,
  }) {
    const skip = (page - 1) * limit;
    const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
    return model
      .find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .select(select ? getSelectData(select) : getUnselectData(unselect))
      .lean();
  },
  async checkDiscountExists({ filter }) {
    return await Discount.findOne(filter).lean();
  },
};

export default DiscountRepo;
