import { Schema, SchemaTypes, model } from "mongoose";

const DOCUMENT_NAME = "SKU";
const COLLECTION_NAME = "SKUs";

const SKUSchema = new Schema(
  {
    sku_spu: { type: SchemaTypes.ObjectId, required: true },
    sku_tier_idx: { type: [SchemaTypes.Number], default: [0] },
    sku_default: { type: SchemaTypes.Boolean, default: false },
    sku_slug: { type: SchemaTypes.String, required: true },
    sku_price: { type: SchemaTypes.Number, required: true },
    sku_stock: { type: SchemaTypes.Number, required: true },
    sku_images: { type: [SchemaTypes.String], default: 0 },
    isPublished: {
      type: SchemaTypes.Boolean,
      index: true,
      default: false,
      select: false,
    },
    isDraft: {
      type: SchemaTypes.Boolean,
      index: true,
      default: true,
      select: false,
    },
    isDeleted: { type: SchemaTypes.Boolean, default: false },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

SKUSchema.index({
  spu_id: 1,
  price: 1,
  "attributes.color": 1,
  "attributes.size": 1,
});

export default model(DOCUMENT_NAME, SKUSchema);
