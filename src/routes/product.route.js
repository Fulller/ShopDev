import { Router } from "express";
import { ProductController } from "../controllers/index.js";
import { ProductValidate } from "../helpers/validate.helper.js";
import { validate, controller } from "../middlewares/index.js";

const ProductRouter = Router();

ProductRouter.post(
  "/create",
  validate(ProductValidate.create),
  controller(ProductController.create)
);

export default ProductRouter;
