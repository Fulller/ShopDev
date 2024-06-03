import InventoryService from "../services/inventory.service.js";

const InventoryController = {
  async addStock(req, res) {
    return res.fly({
      status: 200,
      message: "Add stock in inventory success",
      metadata: await InventoryService.addStockToInventory(req.body),
    });
  },
};

export default InventoryController;
