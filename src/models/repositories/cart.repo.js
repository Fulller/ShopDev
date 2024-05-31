import Cart from "../cart.model.js";
import { toObjectId } from "../../utils/index.js";
import { CART_STATES } from "../../configs/const.config.js";

const CartRepo = {
  async findCartById(id) {
    return await Cart.findOne({
      _id: toObjectId(id),
      cart_state: CART_STATES.ACTIVE,
    }).lean();
  },
};
export default CartRepo;
