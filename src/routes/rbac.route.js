import { Router } from "express";
import { validate, controller } from "../middlewares/index.js";
import { RBACValidate } from "../helpers/validate.helper.js";
import RBACController from "../controllers/rbac.controller.js";
import { checkPermission } from "../middlewares/index.js";
const RBACRouter = Router();

RBACRouter.post(
  "/role",
  validate(RBACValidate.newRole),
  controller(RBACController.newRole)
);
RBACRouter.get(
  "/role",
  checkPermission({
    resource: "rbac",
    action: "read",
    possession: "any",
  }),
  controller(RBACController.listGrant)
);
RBACRouter.post(
  "/role/grant",
  validate(RBACValidate.addGrantToRole),
  controller(RBACController.addGrantToRole)
);
RBACRouter.post(
  "/resource",
  validate(RBACValidate.newResource),
  controller(RBACController.newResource)
);

export default RBACRouter;
