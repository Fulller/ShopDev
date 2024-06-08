import { Router } from "express";
import { controller, authenticate } from "../middlewares/index.js";
import CommentController from "../controllers/comment.controller.js";

const CommentRouter = Router();

CommentRouter.use(authenticate);
CommentRouter.post("/", controller(CommentController.addComment));
CommentRouter.get("/", controller(CommentController.getCommentByProduct));

export default CommentRouter;
