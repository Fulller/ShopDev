import Inventory from "../inventory.model.js";

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
};

export default InventoryRepo;
