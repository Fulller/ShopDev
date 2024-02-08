import { Schema, SchemaTypes, model } from "mongoose";

const DOCUMENT_NAME = "Shop";
const COLLECTION_NAME = "Shops";

const shopSchema = new Schema(
  {
    name: {
      type: SchemaTypes.String,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    password: {
      type: SchemaTypes.String,
      required: true,
    },
    status: {
      type: SchemaTypes.String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    verify: {
      type: SchemaTypes.Boolean,
      default: false,
    },
    roles: { type: SchemaTypes.Array, default: [] },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, shopSchema);
