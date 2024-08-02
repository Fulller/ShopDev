import { Router } from "express";
import { SPUValidate } from "../helpers/validate.helper.js";
import SPUController from "../controllers/spu.controller.js";
import {
  validate,
  controller,
  authenticate,
  checkPermission,
} from "../middlewares/index.js";

const SPURouter = Router();

SPURouter.use(authenticate);
SPURouter.post(
  "/",
  validate(SPUValidate.create),
  controller(SPUController.create)
);
SPURouter.get("/:spu_id", controller(SPUController.get));

export default SPURouter;
