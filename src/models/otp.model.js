import { Schema, SchemaTypes, model } from "mongoose";
import { OTP_STATUS } from "../configs/const.config.js";
const DOCUMENT_NAME = "otp";
const COLLECTION_NAME = "otps";

const otpSchema = new Schema(
  {
    otp_token: { type: SchemaTypes.String, required: true },
    otp_email: { type: SchemaTypes.String, required: true },
    otp_status: {
      type: SchemaTypes.String,
      enum: Object.values(OTP_STATUS),
      default: OTP_STATUS.PENDING,
    },
    expireAt: { type: Date, default: Date.now, expires: 60 },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, otpSchema);
