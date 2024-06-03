import Inventory from "../inventory.model.js";
import { toObjectId } from "../../utils/index.js";

const InventoryRepo = {
  async insertInventory({
    inven_productId,
    inven_shopId,
    inven_stock,
    inven_location = "unknow",
  }) {
    return await Inventory.create({
      inven_productId,
      inven_shopId,
      inven_stock,
      inven_location,
    });
  },
  async resercationInventory({ productId, quantity, carId }) {
    const query = {
      inven_productId: toObjectId(productId),
      inven_stock: { $gte: quantity },
    };
    const updateSet = {
      $inc: { inven_stock: -quantity },
      $push: { inven_reservation: { quantity, cartId } },
    };
    const option = { upsert: true, new: true };
    return await Inventory.updateOne(query, updateSet, option);
  },
};

export default InventoryRepo;
