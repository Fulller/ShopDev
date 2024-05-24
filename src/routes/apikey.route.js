import { Router } from "express";
import { APIKeyController } from "../controllers/index.js";
import { controller } from "../middlewares/index.js";

const APIKeyRouter = Router();

APIKeyRouter.post("/add", controller(APIKeyController.add));

export default APIKeyRouter;
