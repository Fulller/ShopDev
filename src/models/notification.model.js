import { Schema, SchemaTypes, model } from "mongoose";
import { NOTI_TYPES } from "../configs/const.config.js";

const DOCUMENT_NAME = "Notification";
const COLLECTION_NAME = "Notifications";

const notificationSchema = new Schema(
  {
    noti_type: {
      type: SchemaTypes.String,
      enum: Object.values(NOTI_TYPES),
      required: true,
    },
    noti_content: { type: SchemaTypes.String, required: true },
    noti_receivedId: { type: SchemaTypes.Number, required: true },
    noti_senderId: { type: SchemaTypes.ObjectId, required: true, ref: "Shop" },
    noti_options: { type: SchemaTypes.Object, default: {} },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, notificationSchema);
