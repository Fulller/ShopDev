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
UserRouter.post(
  "/login",
  validate(UserValidate.logIn),
  controller(UserController.logIn)
);
UserRouter.get(
  "/verify-signup-otp",
  validate(UserValidate.verifySignUpOTP, "query"),
  controller(UserController.verifySignUpOTP)
);

export default UserRouter;
