import { Schema, SchemaTypes, model } from "mongoose";

const DOCUMENT_NAME = "SPU";
const COLLECTION_NAME = "SPUs";

const SPUSchema = new Schema(
  {
    spu_slug: { type: SchemaTypes.String, required: true, unique: true },
    spu_name: { type: SchemaTypes.String, required: true },
    spu_description: { type: SchemaTypes.String, required: true },
    spu_category: { type: [SchemaTypes.String], required: true },
    spu_brand: { type: SchemaTypes.String, required: true },
    spu_images: { type: [SchemaTypes.String], required: true },
    spu_shop: { type: SchemaTypes.ObjectId, ref: "Shop", required: true },
    spu_variations: [
      {
        name: SchemaTypes.String,
        images: [SchemaTypes.String],
        options: [SchemaTypes.String],
      },
    ],
    spu_skus: [{ type: SchemaTypes.ObjectId, ref: "SKU", default: [] }],
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

export default model(DOCUMENT_NAME, SPUSchema);
