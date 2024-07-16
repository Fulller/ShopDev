import { Router } from "express";
import { APIKeyController } from "../controllers/index.js";
import { controller, validate } from "../middlewares/index.js";
import { APIKeyValidate } from "../helpers/validate.helper.js";

const APIKeyRouter = Router();

APIKeyRouter.post(
  "/add",
  validate(APIKeyValidate.add),
  controller(APIKeyController.add)
);

export default APIKeyRouter;
