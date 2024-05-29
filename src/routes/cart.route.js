import { Router } from "express";
import { controller } from "../middlewares/index.js";
import CartController from "../controllers/cart.controller.js";

const CartRouter = Router();

CartRouter.post("/", controller(CartController.addToCart));
CartRouter.post("/update", controller(CartController.update));
CartRouter.delete("/", controller(CartController.delete));
CartRouter.get("/", controller(CartController.listToCart));

export default CartRouter;
