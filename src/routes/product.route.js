import { Router } from "express";
import { ProductController } from "../controllers/index.js";
import { ProductValidate } from "../helpers/validate.helper.js";
import { validate, controller, authenticate } from "../middlewares/index.js";

const ProductRouter = Router();

// Route WITHOUT authenticate
ProductRouter.get(
  "/search/:keySearch",
  controller(ProductController.searchProductByuser)
);
ProductRouter.get("/:id", controller(ProductController.getProduct));
ProductRouter.get("/", controller(ProductController.getAllProducts));

// Route WITH authenticate
ProductRouter.use(authenticate);
ProductRouter.post(
  "/",
  validate(ProductValidate.create),
  controller(ProductController.create)
);
ProductRouter.patch("/:id", controller(ProductController.updateProduct));
ProductRouter.post(
  "/publish/:id",
  controller(ProductController.publishProductByShop)
);
ProductRouter.post(
  "/unpublish/:id",
  controller(ProductController.unpublishProductByShop)
);
ProductRouter.get(
  "/drafts/all",
  controller(ProductController.getAllDraftsForShop)
);
ProductRouter.get(
  "/published/all",
  controller(ProductController.getAllPublishForShop)
);

export default ProductRouter;
