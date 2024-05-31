import CheckoutService from "../services/checkout.service.js";

const CheckoutController = {
  async checkoutReview(req, res) {
    return res.fly({
      status: 200,
      message: "Check out success",
      metadata: await CheckoutService.checkoutReview(req.body),
    });
  },
};

export default CheckoutController;
