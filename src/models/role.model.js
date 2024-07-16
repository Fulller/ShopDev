import { Schema, SchemaTypes, model } from "mongoose";
import { ROLE_NAMES, ROLE_STATUS } from "../configs/const.config.js";
const DOCUMENT_NAME = "Role";
const COLLECTION_NAME = "Roles";

const roleSchema = new Schema(
  {
    rol_name: {
      type: SchemaTypes.String,
      default: ROLE_NAMES.USER,
      enum: Object.values(ROLE_NAMES),
    },
    rol_slug: {
      type: SchemaTypes.String,
      require: true,
    },
    rol_status: {
      type: SchemaTypes.String,
      default: ROLE_STATUS.ACTIVE,
      enum: Object.values(ROLE_STATUS),
    },
    rol_description: {
      type: SchemaTypes.String,
      default: "",
    },
    rol_grant: [
      {
        resource: {
          type: SchemaTypes.ObjectId,
          ref: "Resource",
          require: true,
        },
        actions: [{ type: SchemaTypes.String, require: true }],
        attributes: { type: SchemaTypes.String, default: "*" },
      },
    ],
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, roleSchema);
