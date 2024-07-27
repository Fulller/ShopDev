import { Router } from "express";
import MailerController from "../controllers/mailer.controller.js";

const MailerRouter = Router();

MailerRouter.post("/send-welcome-email", MailerController.sendWelcomeEmail);

export default MailerRouter;
