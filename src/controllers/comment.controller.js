import CommentService from "../services/comment.service.js";
import { serviceWithSession } from "../middlewares/index.js";

const CommentController = {
  async addComment(req, res) {
    res.fly({
      status: 200,
      message: "Add comment success",
      // metadata: await serviceWithSession(CommentService.addComment, req.body),
      metadata: await CommentService.addComment(req.body),
    });
  },
  async deleteComment(req, res) {
    res.fly({
      status: 200,
      message: "Deelete comment seccess",
      metadata: await CommentService.deleteComment(req.body),
    });
  },
  async getCommentByProduct(req, res) {
    res.fly({
      status: 200,
      message: "Get comment by product id seccess",
      metadata: await CommentService.getCommentsByProduct(req.query),
    });
  },
};

export default CommentController;
