import { Router } from "express";
import { validate, controller, authenticate } from "../middlewares/index.js";
import { DiscountValidate } from "../helpers/validate.helper.js";
import DiscountController from "../controllers/discount.controller.js";
const DiscountRouter = Router();

DiscountRouter.post(
  "/amount",
  // validate(DiscountValidate.createDiscountByShop),
  controller(DiscountController.getDiscountAmount)
);
DiscountRouter.get(
  "/list_product_code",
  // validate(DiscountValidate.createDiscountByShop),
  controller(DiscountController.getAllDiscountWithProduct)
);
DiscountRouter.use(authenticate);
DiscountRouter.post(
  "/",
  validate(DiscountValidate.createDiscountByShop),
  controller(DiscountController.createDiscountByShop)
);
DiscountRouter.get(
  "/",
  // validate(DiscountValidate.createDiscountByShop),
  controller(DiscountController.getAllDiscountCodesByShop)
);

export default DiscountRouter;
