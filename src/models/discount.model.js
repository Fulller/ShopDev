import { Schema, SchemaTypes, model } from "mongoose";
import { DISCOUNT_TYPES } from "../configs/const.config.js";

const DOCUMENT_NAME = "Discount";
const COLLECTION_NAME = "Discounts";

const discountSchema = new Schema(
  {
    discount_name: { type: SchemaTypes.String, require: true },
    discount_description: { type: SchemaTypes.String, require: true },
    discount_type: {
      type: SchemaTypes.String,
      default: DISCOUNT_TYPES.FIXED_AMOUNT,
    },
    discount_value: { type: SchemaTypes.Number, require: true },
    discount_code: { type: SchemaTypes.String, require: true },
    discount_start_date: { type: SchemaTypes.Date, require: true },
    discount_end_date: { type: SchemaTypes.Date, require: true },
    discount_max_uses: { type: SchemaTypes.Number, require: true },
    discount_uses_count: { type: SchemaTypes.Number, default: [] },
    discount_users_used: { type: SchemaTypes.Array, default: [] },
    discount_min_order_value: { type: SchemaTypes.Number, require: true },
    discount_shopId: { type: SchemaTypes.ObjectId, ref: "Shop" },
    discount_is_active: { type: SchemaTypes.Boolean, default: true },
    discount_applies_to: {
      type: SchemaTypes.String,
      require: true,
      enum: ["all", "specific"],
    },
    discount_product_ids: { type: SchemaTypes.Array, default: [] },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, discountSchema);
