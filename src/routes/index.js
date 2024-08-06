import {
  handleError,
  responseFlying,
  checkAPIKey,
  checkPermissionAPIKey,
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
import CommentRouter from "./comment.route.js";
import NotificationRouter from "./notification.route.js";
import UploadRouter from "./upload.route.js";
import RBACRouter from "./rbac.route.js";
import MailerRouter from "./mailer.route.js";
import TemplateRouter from "./template.route.js";
import UserRouter from "./user.route.js";
import SPURouter from "./spu.route.js";
import SKURouter from "./sku.route.js";

import { PERMISSION } from "../configs/const.config.js";
const router = Router();

router.use(responseFlying);
router.get("/ping", (req, res) => res.fly({ status: 200, message: "Pong" }));
router.use("/api", router);
router.use("/user", UserRouter);
router.use(checkAPIKey);
router.use(checkPermissionAPIKey(PERMISSION.ZERO));
router.use("/api-key", APIKeyRouter);
router.use("/shop", ShopRouter);
router.use("/product", ProductRouter);
router.use("/discount", DiscountRouter);
router.use("/cart", CartRouter);
router.use("/checkout", CheckoutRouter);
router.use("/inventory", InventoryRouter);
router.use("/comment", CommentRouter);
router.use("/notification", NotificationRouter);
router.use("/upload", UploadRouter);
router.use("/rbac", RBACRouter);
router.use("/mailer", MailerRouter);
router.use("/template", TemplateRouter);
router.use("/spu", SPURouter);
router.use("/sku", SKURouter);

router.use(notFound);
router.use(handleError);

export default router;
