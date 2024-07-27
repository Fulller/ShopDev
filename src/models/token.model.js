import { Schema, SchemaTypes, model } from "mongoose";
import env from "../configs/env.config.js";

const DOCUMENT_NAME = "Token";
const COLLECTION_NAME = "Tokens";

const tokenSchema = new Schema(
  {
    user: {
      type: SchemaTypes.String,
      required: true,
    },
    token: {
      type: SchemaTypes.String,
      required: true,
    },
    createdAt: {
      type: SchemaTypes.Date,
      default: Date.now,
      expires: env.auth.jwt.refresh_ex,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, tokenSchema);
