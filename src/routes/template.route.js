import { Router } from "express";
import { TemplateValidate } from "../helpers/validate.helper.js";
import TemplateController from "../controllers/template.controller.js";
import {
  validate,
  controller,
  authenticate,
  checkPermission,
} from "../middlewares/index.js";

const TemplateRouter = Router();

TemplateRouter.use(authenticate);
TemplateRouter.post(
  "/",
  checkPermission({
    action: "create",
    resource: "template",
    possession: "any",
  }),
  validate(TemplateValidate.add),
  controller(TemplateController.add)
);

export default TemplateRouter;
