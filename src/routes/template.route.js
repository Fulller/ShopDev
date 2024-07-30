import { Router } from "express";
import { validate, controller, cache } from "../middlewares/index.js";
import { TemplateValidate } from "../helpers/validate.helper.js";
import TemplateController from "../controllers/template.controller.js";
import { checkPermission } from "../middlewares/index.js";
const TemplateRouter = Router();

TemplateRouter.post(
  "/",
  validate(TemplateValidate.add),
  controller(TemplateController.add)
);

export default TemplateRouter;
