import { Schema, SchemaTypes, model } from "mongoose";
import {
  ROLE_NAMES,
  ROLE_STATUS,
  ROLE_POSSESSIONS,
  ROLE_ACTIONS,
} from "../configs/const.config.js";
const DOCUMENT_NAME = "Role";
const COLLECTION_NAME = "Roles";

const grantSchema = new Schema(
  {
    resource: {
      type: SchemaTypes.ObjectId,
      ref: "Resource",
      require: true,
    },
    action: {
      type: SchemaTypes.String,
      require: true,
      enum: Object.values(ROLE_ACTIONS),
    },
    possession: {
      type: SchemaTypes.String,
      require: true,
      enum: Object.values(ROLE_POSSESSIONS),
    },
    attribute: { type: SchemaTypes.String, default: "*" },
  },
  { _id: true }
);

const roleSchema = new Schema(
  {
    rol_name: {
      type: SchemaTypes.String,
      default: ROLE_NAMES.USER,
      unique: true,
      enum: Object.values(ROLE_NAMES),
    },
    rol_slug: {
      type: SchemaTypes.String,
      unique: true,
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
    rol_grants: [grantSchema],
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, roleSchema);
