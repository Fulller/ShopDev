import { Schema, SchemaTypes, model } from "mongoose";
import { TEMPLATE_STATUS } from "../configs/const.config.js";
const DOCUMENT_NAME = "Template";
const COLLECTION_NAME = "Templates";

const templateSchema = new Schema(
  {
    tem_id: { type: SchemaTypes.Number, required: true },
    tem_name: { type: SchemaTypes.String, required: true },
    tem_status: {
      type: SchemaTypes.String,
      enum: Object.values(TEMPLATE_STATUS),
      default: TEMPLATE_STATUS.ACTIVE,
    },
    tem_html: { type: SchemaTypes.String, required: true },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, templateSchema);
