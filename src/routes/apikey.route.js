import { Router } from "express";
import { APIKeyController } from "../controllers/index.js";
import {
  controller,
  validate,
  checkPermission,
  authenticate,
} from "../middlewares/index.js";
import { APIKeyValidate } from "../helpers/validate.helper.js";

const APIKeyRouter = Router();

APIKeyRouter.use(authenticate);
APIKeyRouter.post(
  "/add",
  checkPermission({
    resource: "api-key",
    action: "create",
    possession: "any",
  }),
  validate(APIKeyValidate.add),
  controller(APIKeyController.add)
);

export default APIKeyRouter;
