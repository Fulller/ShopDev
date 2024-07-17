import { Schema, SchemaTypes, model } from "mongoose";

const DOCUMENT_NAME = "Resource";
const COLLECTION_NAME = "Resources";

const resourceSchema = new Schema(
  {
    src_name: {
      type: SchemaTypes.String,
      require: true,
    },
    src_slug: {
      type: SchemaTypes.String,
      require: true,
    },
    src_description: {
      type: SchemaTypes.String,
      default: "",
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, resourceSchema);
