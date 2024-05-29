import Cart from "../models/cart.model.js";
import ProductRepo from "../models/repositories/product.repo.js";
import { CART_STATES } from "../configs/const.config.js";
import createHttpError from "http-errors";

const CartService = {
  async createUserCart({ userId }) {
    const query = { cart_userId: userId, cart_state: CART_STATES.ACTIVE };
    const options = { upsert: true, new: true };
    return await Cart.findOneAndUpdate(query, {}, options);
  },
  async updateUserCartQuantity({ userId, product }) {
    const { productId, quantity } = product;
    const query = {
      cart_userId: userId,
      "cart_products.productId": productId,
      cart_state: CART_STATES.ACTIVE,
    };
    const updateSet = { $inc: { "cart_products.$.quantity": quantity } };
    const options = { upsert: true, new: true };
    return await Cart.findOneAndUpdate(query, updateSet, options);
  },
  async addToCart({ userId, product }) {
    const { productId } = product;
    let userCart = await Cart.findOne({ cart_userId: userId });
    if (!userCart) {
      userCart = await this.createUserCart({ userId });
    }
    const productIndex = userCart.cart_products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex !== -1) {
      await this.updateUserCartQuantity({ userId, product });
    } else {
      userCart.cart_products.push(product);
    }
    await userCart.save();
    return userCart;
  },
  async addToCartV2({ userId, shop_order_ids }) {
    const { productId, quantity, old_quantity } =
      shop_order_ids[0]?.item_products[0];
    const foundProduct = await ProductRepo.getProductById(productId);
    if (!foundProduct) {
      throw createHttpError(404, "Product has not found");
    }
    if (foundProduct.product_shop.toString() !== shop_order_ids[0]?.shopId) {
      throw createHttpError(404, "Product does not belong to the shop");
    }
    if (quantity === 0) {
      // lelete
    }
    return this.updateUserCartQuantity({
      userId,
      product: { productId, quantity: quantity - old_quantity },
    });
  },
  async deleteUserCart({ userId, productId }) {
    const query = { cart_userId: userId, cart_state: CART_STATES.ACTIVE };
    const updateSet = { $pull: { cart_products: { productId } } };
    const deleteCart = await Cart.updateOne(query, updateSet);
    return deleteCart;
  },
  async getListUserCart({ userId }) {
    return Cart.findOne({ cart_userId: userId }).lean();
  },
};

export default CartService;
