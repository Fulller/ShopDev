import { Schema, SchemaTypes, model } from "mongoose";

const DOCUMENT_NAME = "APIKey";
const COLLECTION_NAME = "APIKeys";

const APIKeySchema = new Schema(
  {
    key: {
      type: SchemaTypes.String,
      required: true,
      unique: true,
    },
    active: {
      type: SchemaTypes.Boolean,
      default: true,
    },
    permissions: {
      type: [SchemaTypes.String],
      require: true,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, APIKeySchema);
