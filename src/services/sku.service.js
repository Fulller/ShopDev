import SKU from "../models/sku.model.js";
import createHttpError from "http-errors";

const SKUService = {
  async create(data) {
    return SKU.create(data);
  },
  async lookup({ sku_spu, sku_tier_idx }) {
    const sku = await SKU.findOne({
      sku_spu: sku_spu,
      sku_tier_idx: { $all: sku_tier_idx },
    });
    if (!sku) {
      throw createHttpError(404, "SKU not found");
    }
    return sku;
  },
};
export default SKUService;
