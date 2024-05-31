import Discount from "../models/discount.model.js";
import DiscountRepo from "../models/repositories/discount.repo.js";
import ProductRepo from "../models/repositories/product.repo.js";
import { toObjectId } from "../utils/index.js";
import { DISCOUNT_TYPES } from "../configs/const.config.js";
import createHttpError from "http-errors";

const DiscountService = {
  async createDiscountByShop({
    name,
    description,
    type,
    value,
    code,
    start_date,
    end_date,
    max_uses,
    uses_count,
    users_used,
    max_uses_per_user,
    min_order_value,
    shopId,
    is_active,
    applies_to,
    product_ids,
  }) {
    const foundDiscount = await Discount.findOne({
      discount_code: code,
      discount_shopId: toObjectId(shopId),
    }).lean();
    if (foundDiscount) {
      throw createHttpError(400, "The discount code already exists");
    }
    return await Discount.create({
      discount_name: name,
      discount_description: description,
      discount_type: type,
      discount_value: value,
      discount_code: code,
      discount_start_date: new Date(start_date),
      discount_end_date: new Date(end_date),
      discount_max_uses: max_uses,
      discount_uses_count: uses_count,
      discount_users_used: users_used,
      discount_max_uses_per_user: max_uses_per_user,
      discount_min_order_value: min_order_value || 0,
      discount_shopId: shopId,
      discount_is_active: is_active,
      discount_applies_to: applies_to,
      discount_product_ids: applies_to === "all" ? [] : product_ids,
    });
  },
  async getAllDiscountWithProduct({ code, shopId, userId, limit, page }) {
    const foundDiscount = await Discount.findOne({
      discount_code: code,
      discount_shopId: toObjectId(shopId),
      discount_is_active: true,
    }).lean();
    if (!foundDiscount) {
      throw createHttpError(404, "The discount does not exist");
    }
    let products;
    const { discount_applies_to, discount_product_ids } = foundDiscount;
    switch (discount_applies_to) {
      case "all": {
        products = await ProductRepo.findAllProducts({
          filter: {
            product_shop: toObjectId(shopId),
            isPublished: true,
          },
          limit: +limit,
          page: +page,
          sort: "ctime",
          select: ["product_name"],
        });
        break;
      }
      case "specific": {
        products = await ProductRepo.findAllProducts({
          filter: {
            _id: { $in: discount_product_ids },
            isPublished: true,
          },
          limit: +limit,
          page: +page,
          sort: "ctime",
          select: ["product_name"],
        });
        break;
      }
    }
    return products;
  },
  async getAllDiscountCodesByShop({ limit, page, shopId }) {
    return await DiscountRepo.findAllDiscountCode({
      limit: +limit,
      page: +page,
      filter: { discount_shopId: toObjectId(shopId), discount_is_active: true },
      select: [
        "discount_code",
        "discount_name",
        "discount_value",
        "discount_type",
      ],
      model: Discount,
    });
  },
  async getDiscountAmount({ codeId, userId, shopId, products }) {
    const foundDiscount = await DiscountRepo.checkDiscountExists({
      filter: { discount_code: codeId, discount_shopId: toObjectId(shopId) },
    });
    if (!foundDiscount) {
      throw createHttpError(404, "Discount does not exist");
    }
    const {
      discount_is_active,
      discount_max_uses,
      discount_start_date,
      discount_end_date,
      discount_min_order_value,
      discount_type,
      discount_value,
    } = foundDiscount;
    if (!discount_is_active) {
      throw createHttpError(400, "Discount is not active");
    }
    if (!discount_max_uses) {
      throw createHttpError(400, "Discount is out");
    }
    if (
      new Date(discount_start_date) > Date.now() ||
      new Date(discount_end_date) < Date.now()
    ) {
      throw createHttpError("400", "Discount has expired");
    }
    let totalOrder = 0;
    if (discount_min_order_value > 0) {
      totalOrder = products.reduce((acc, { quantity, price }) => {
        return acc + quantity * price;
      }, 0);
      if (totalOrder < discount_min_order_value) {
        throw createHttpError(
          "400",
          `Total order is lower than min order value of ${discount_min_order_value}`
        );
      }
    }
    let amount = 0;
    switch (discount_type) {
      case DISCOUNT_TYPES.FIXED_AMOUNT: {
        amount = discount_value;
        break;
      }
      case DISCOUNT_TYPES.PERCENTAGE: {
        amount = (totalOrder * discount_value) / 100;
        break;
      }
    }
    const totalPrice = totalOrder - amount;
    console.log({ totalOrder, amount, totalPrice });
    return { totalOrder, amount, totalPrice };
  },
  async deleteDiscount({ discountId, shopId }) {
    const deleted = await Discount.findOneAndDelete({
      _id: toObjectId(discountId),
      discount_shopId: toObjectId(shopId),
    });
    return deleted;
  },
  async cancelDiscount({ codeId, shopId, userId }) {
    // Check if the discount exists
    const foundDiscount = await DiscountRepo.checkDiscountExists({
      filter: { discount_code: codeId, discount_shop: toObjectId(shopId) },
    });
    if (!foundDiscount) {
      throw createHttpError(404, "Discount does not exist");
    }

    // Update the discount
    const result = await Discount.findByIdAndUpdate(foundDiscount._id, {
      $pull: { discount_users_used: userId },
      $inc: { discount_max_uses: 1, discount_uses_count: -1 },
    });

    return result;
  },
};

export default DiscountService;
