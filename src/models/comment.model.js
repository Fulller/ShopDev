import { Schema, SchemaTypes, model } from "mongoose";

const DOCUMENT_NAME = "Comment";
const COLLECTION_NAME = "Comments";

const commentSchema = new Schema(
  {
    comment_productId: { type: SchemaTypes.ObjectId, ref: "Product" },
    comment_useId: { type: SchemaTypes.Number },
    comment_content: { type: SchemaTypes.String, default: "" },
    comment_parentId: { type: SchemaTypes.ObjectId, ref: DOCUMENT_NAME },
    comment_left: { type: SchemaTypes.Number, default: 0 },
    comment_right: { type: SchemaTypes.Number, default: 0 },
    isDelete: { type: SchemaTypes.Boolean, default: false },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, commentSchema);
