import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { UserValidate } from "../helpers/validate.helper.js";
import { validate, controller } from "../middlewares/index.js";

const UserRouter = Router();

UserRouter.post(
  "/signup",
  validate(UserValidate.signUp),
  controller(UserController.signUp)
);

export default UserRouter;
