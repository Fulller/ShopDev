import Order from "../models/order.model.js";
import CartRepo from "../models/repositories/cart.repo.js";
import ProductRepo from "../models/repositories/product.repo.js";
import DiscountService from "../services/discount.service.js";
import RedisService from "./redis.lock.service.js";
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
    const shop_order_ids_new = [];
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
      shop_order_ids_new.push(itemCheckout);
    }
    return { shop_order_ids, shop_order_ids_new, checkout_order };
  },
  async orderByUser({
    shop_order_ids,
    cartId,
    userId,
    user_address = {},
    user_payment = {},
  }) {
    const { shop_order_ids_new, checkout_order } = await this.checkoutReview({
      cartId,
      userId,
      shop_order_ids,
    });
    const products = shop_order_ids_new.flatMap((order) => order.item_products);
    console.log("Step 1 :: ", products);
    const acquireProduct = [];
    for (let i = 0; i < products.length; i++) {
      const { productId, quantity } = products[i];
      const keyLock = await RedisService.acquireLock(
        productId,
        quantity,
        cartId
      );
      acquireProduct.push(keyLock ? true : false);
      if (keyLock) {
        await RedisService.releaseLock(keyLock);
      }
    }
    //If there is a product that has no item in stock
    if (acquireProduct.includes(false)) {
      throw createHttpError(
        400,
        "Some products have been updated, please come back to the shop"
      );
    }
    const newOrder = await Order.create({
      order_userId: userId,
      order_checkout: checkout_order,
      order_shipping: user_address,
      order_payment: user_payment,
      order_products: shop_order_ids_new,
    });
    //
    if (newOrder) {
    }
    return newOrder;
  },
  async getOrdersByUser() {},
  async getOneOrderByUser() {},
  async cancelOrderByUser() {},
  async updateOrderStatusByShop() {},
};
export default CheckoutService;
