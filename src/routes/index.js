import {
  handleError,
  responseFlying,
  checkAPIKey,
  checkPermission,
  notFound,
} from "../middlewares/index.js";
import { Router } from "express";
import ShopRouter from "./shop.route.js";
import APIKeyRouter from "./apikey.route.js";
import ProductRouter from "./product.route.js";
import DiscountRouter from "./discount.route.js";
import CartRouter from "./cart.route.js";
import CheckoutRouter from "./checkout.route.js";
import InventoryRouter from "./inventory.route.js";

import { PERMISSION } from "../configs/const.config.js";
const router = Router();

router.use(responseFlying);
router.use("/api_key", APIKeyRouter);
router.get("/ping", (req, res) => res.fly({ status: 200, message: "Pong" }));

router.use("/api", router);
router.use(checkAPIKey);
router.use(checkPermission(PERMISSION.ZERO));
router.use("/shop", ShopRouter);
router.use("/product", ProductRouter);
router.use("/discount", DiscountRouter);
router.use("/cart", CartRouter);
router.use("/checkout", CheckoutRouter);
router.use("/inventory", InventoryRouter);

router.use(notFound);
router.use(handleError);

export default router;
