import { Schema, SchemaTypes, model } from "mongoose";
import { USER_STATUS } from "../configs/const.config.js";

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";

const userSchema = new Schema(
  {
    usr_id: {
      type: SchemaTypes.Number,
      require: true,
    },
    usr_slug: {
      type: SchemaTypes.String,
      require: true,
    },
    usr_name: {
      type: SchemaTypes.String,
      default: "",
    },
    usr_password: {
      type: SchemaTypes.String,
      default: "",
    },
    usr_salf: {
      type: SchemaTypes.String,
      default: "",
    },
    usr_email: {
      type: SchemaTypes.String,
      require: true,
    },
    usr_phone: {
      type: SchemaTypes.String,
      default: "",
    },
    usr_sex: {
      type: SchemaTypes.String,
      default: "",
    },
    usr_avatar: {
      type: SchemaTypes.String,
      default: "",
    },
    usr_data_of_birth: {
      type: SchemaTypes.Date,
      default: null,
    },
    usr_role: { type: SchemaTypes.ObjectId, ref: "Role" },
    usr_status: {
      type: SchemaTypes.String,
      enum: Object.values(USER_STATUS),
      default: USER_STATUS.PENDING,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, userSchema);