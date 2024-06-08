import Comment from "../models/comment.model.js";
import createHttpError from "http-errors";
import { getSelectData } from "../utils/index.js";

const CommentService = {
  async addComment({ productId, userId, content, parentId = null }, session) {
    let newLeft, newRight;

    if (parentId) {
      const parentComment = await Comment.findById(parentId).session(session);
      if (!parentComment) {
        throw createHttpError(404, "Parent comment not found");
      }

      newLeft = parentComment.comment_right;
      newRight = newLeft + 1;

      await Comment.updateMany(
        {
          comment_productId: productId,
          comment_right: { $gte: parentComment.comment_right },
        },
        { $inc: { comment_right: 2 } },
        { session }
      );

      await Comment.updateMany(
        {
          comment_productId: productId,
          comment_left: { $gt: parentComment.comment_right },
        },
        { $inc: { comment_left: 2 } },
        { session }
      );
    } else {
      const maxRight = await Comment.find({ comment_productId: productId })
        .sort({ comment_right: -1 })
        .limit(1)
        .select("comment_right")
        .session(session);

      newLeft = maxRight.length ? maxRight[0].comment_right + 1 : 1;
      newRight = newLeft + 1;
    }

    const newComment = new Comment({
      comment_productId: productId,
      comment_userId: userId,
      comment_content: content,
      comment_parentId: parentId,
      comment_left: newLeft,
      comment_right: newRight,
    });
    await newComment.save({ session });
    return newComment;
  },
  async getCommentsByProduct({
    productId,
    parentCommentId = null,
    limit = 50,
    offset = 0,
  }) {
    if (parentCommentId) {
      const parent = await Comment.findById(parentCommentId);
      if (!parent) {
        throw createHttpError(404, "Not found comment");
      }
      const comments = await Comment.find({
        comment_productId: productId,
        comment_left: { $gt: parent.comment_left },
        comment_right: { $lte: parent.comment_right },
      })
        .select(
          getSelectData([
            "comment_parentId",
            "comment_content",
            "comment_left",
            "comment_right",
          ])
        )
        .sort({ comment_left: 1 });
      return comments;
    }
    return await await Comment.find({
      comment_productId: productId,
    })
      .select(
        getSelectData([
          "comment_parentId",
          "comment_content",
          "comment_left",
          "comment_right",
        ])
      )
      .sort({ comment_left: 1 });
  },
};

export default CommentService;
