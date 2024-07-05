import { Router } from "express";
import { controller, authenticate } from "../middlewares/index.js";
import NotificationController from "../controllers/notification.controller.js";

const NotificationRouter = Router();

NotificationRouter.use(authenticate);
NotificationRouter.get("/", controller(NotificationController.listNotiByUser));

export default NotificationRouter;
