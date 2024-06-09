import { Router } from "express";
import { controller, authenticate, validate } from "../middlewares/index.js";
import { CommentValidate } from "../helpers/validate.helper.js";
import CommentController from "../controllers/comment.controller.js";

const CommentRouter = Router();

CommentRouter.use(authenticate);
CommentRouter.post(
  "/",
  validate(CommentValidate.addComment),
  controller(CommentController.addComment)
);
CommentRouter.delete(
  "/",
  validate(CommentValidate.deleteComment),
  controller(CommentController.deleteComment)
);
CommentRouter.get("/", controller(CommentController.getCommentByProduct));

export default CommentRouter;
