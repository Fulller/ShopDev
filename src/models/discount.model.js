import { Schema, SchemaTypes, model } from "mongoose";

const DOCUMENT_NAME = "Discount";
const COLLECTION_NAME = "Discounts";

const discountSchema = new Schema(
  {
    discount_name: { type: SchemaTypes.String, require: true },
    discount_description: { type: SchemaTypes.String, require: true },
    discount_type: { type: SchemaTypes.String, default: "fixed_amount" },
    discount_value: { type: SchemaTypes.Number, require: true },
    discount_code: { type: SchemaTypes.String, require: true },
    discount_start_date: { type: SchemaTypes.Date, require: true },
    discount_end_date: { type: SchemaTypes.Date, require: true },
    discount_max_uses: { type: SchemaTypes.Number, require: true },
    discount_uses_count: { type: SchemaTypes.Array, default: [] },
    discount_max_uses_per_user: { type: SchemaTypes.Number, require: true },
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
