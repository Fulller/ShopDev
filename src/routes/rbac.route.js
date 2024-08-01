import { Router } from "express";
import {
  validate,
  controller,
  cache,
  authenticate,
} from "../middlewares/index.js";
import { RBACValidate } from "../helpers/validate.helper.js";
import RBACController from "../controllers/rbac.controller.js";
import { checkPermission } from "../middlewares/index.js";
const RBACRouter = Router();

RBACRouter.use(authenticate);
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
  cache({ status: 200, message: "GET LIST GRANT FROM CACHE REDIS" }),
  controller(RBACController.listGrant)
);
RBACRouter.post(
  "/role/grant",
  validate(RBACValidate.addGrantToRole),
  controller(RBACController.addGrantToRole)
);
RBACRouter.delete(
  "/role/:role_id/grant/:grant_id",
  validate(RBACValidate.removeGrantFromRole, "params"),
  controller(RBACController.removeGrantFromRole)
);
RBACRouter.patch(
  "/role/:role_id/grant/:grant_id",
  validate(RBACValidate.updateGrantInRole, ["params", "body"]),
  controller(RBACController.updateGrantInRole)
);
RBACRouter.post(
  "/resource",
  validate(RBACValidate.newResource),
  controller(RBACController.newResource)
);

export default RBACRouter;
