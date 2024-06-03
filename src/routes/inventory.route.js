import { Router } from "express";
import { controller, authenticate } from "../middlewares/index.js";
import InventoryController from "../controllers/inventory.controller.js";

const InventoryRouter = Router();

InventoryRouter.use(authenticate);
InventoryRouter.post("/", controller(InventoryController.addStock));

export default InventoryRouter;
