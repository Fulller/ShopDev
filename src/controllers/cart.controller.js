import CartService from "../services/cart.service.js";

const CartController = {
  async addToCart(req, res) {
    return res.fly({
      status: 200,
      message: "Add product cart to cart successfuly",
      metadata: await CartService.addToCart(req.body),
    });
  },
  async update(req, res) {
    return res.fly({
      status: 200,
      message: "Update cart product to cart successfuly",
      metadata: await CartService.addToCartV2(req.body),
    });
  },
  async delete(req, res) {
    return res.fly({
      status: 200,
      message: "Delete cart product to cart successfuly",
      metadata: await CartService.deleteUserCart(req.body),
    });
  },
  async listToCart(req, res) {
    return res.fly({
      status: 200,
      message: "Get list cart successfuly",
      metadata: await CartService.getListUserCart(req.query),
    });
  },
};

export default CartController;
