import CartRepo from "../models/repositories/cart.repo.js";
import ProductRepo from "../models/repositories/product.repo.js";
import DiscountService from "../services/discount.service.js";
import createHttpError from "http-errors";

const CheckoutService = {
  async checkoutReview({ cartId, userId, shop_order_ids }) {
    const foundCart = await CartRepo.findCartById(cartId);
    if (!foundCart) {
      throw createHttpError(404, "Cart has not been found");
    }
    const checkout_order = {
      totalPrice: 0,
      feeShip: 0,
      totalDiscount: 0,
      totalCheckout: 0,
    };
    const new_shop_order_ids = [];
    for (const shop_order_id of shop_order_ids) {
      const { shopId, shop_discounts = [], item_products = [] } = shop_order_id;
      const checkProductServer = await ProductRepo.checkProductByServer(
        item_products
      );

      if (!checkProductServer[0]) {
        throw createHttpError(400, "Order is wrong !!!");
      }
      const checkoutPrice = checkProductServer.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0);

      checkout_order.totalPrice += checkoutPrice;
      const itemCheckout = {
        shopId,
        shop_discounts,
        priceRaw: checkoutPrice,
        priceApplyDiscount: checkoutPrice,
        item_products: checkProductServer,
      };
      if (shop_discounts.length > 0) {
        const { totalPrice = 0, amount = 0 } =
          await DiscountService.getDiscountAmount({
            codeId: shop_discounts[0].codeId,
            userId,
            shopId,
            products: checkProductServer,
          });
        console.log(`amount :: ${amount}`);
        checkout_order.totalDiscount += amount;
        if (amount > 0) {
          itemCheckout.priceApplyDiscount = checkoutPrice - amount;
        }
      }
      checkout_order.totalCheckout += itemCheckout.priceApplyDiscount;
      new_shop_order_ids.push(itemCheckout);
    }
    return { shop_order_ids, new_shop_order_ids, checkout_order };
  },
};
export default CheckoutService;
