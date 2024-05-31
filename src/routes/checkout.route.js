import { Router } from "express";
import { controller } from "../middlewares/index.js";
import CheckoutController from "../controllers/checkout.controller.js";

const CheckoutRouter = Router();

CheckoutRouter.post("/review", controller(CheckoutController.checkoutReview));

export default CheckoutRouter;
