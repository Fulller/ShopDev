import DiscountService from "../services/discount.service.js";

const DiscountController = {
  async createDiscountByShop(req, res) {
    const shopId = req.user._id;
    const discountPayload = req.body;
    discountPayload.shopId = shopId;
    const newDiscount = await DiscountService.createDiscountByShop(
      discountPayload
    );
    res.fly({
      status: 200,
      message: "Create new discount by shop successfully",
      metadata: newDiscount,
    });
  },
  //get
  async getAllDiscountCodesByShop(req, res) {
    const { shopId } = req.query;
    const discountCodes = await DiscountService.getAllDiscountCodesByShop({
      shopId,
    });
    res.fly({
      status: 200,
      message: "Get all discount codes by shop",
      metadata: discountCodes,
    });
  },
  //post
  async getDiscountAmount(req, res) {
    const { codeId, userId, shopId, products } = req.body;
    const result = await DiscountService.getDiscountAmount({
      codeId,
      userId,
      shopId,
      products,
    });
    res.fly({
      status: 200,
      message: "Get discount amount",
      metadata: result,
    });
  },
  //get
  async getAllDiscountWithProduct(req, res) {
    const { code, userId, shopId } = req.query;
    const products = await DiscountService.getAllDiscountWithProduct({
      code,
      userId,
      shopId,
    });
    res.fly({
      status: 200,
      message: "Get all discount with products",
      metadata: products,
    });
  },
};

export default DiscountController;
