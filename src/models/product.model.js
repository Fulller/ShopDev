import { Schema, SchemaTypes, model } from "mongoose";

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";
const DOCUMENT_NAME_CLOTHING = "Clothing";
const COLLECTION_NAME_CLOTHING = "Clothes";
const DOCUMENT_NAME_ELECTRONIC = "Electronic";
const COLLECTION_NAME_ELECTRONIC = "Electronics";

const productSchema = new Schema(
  {
    name: {
      type: SchemaTypes.String,
      required: true,
    },
    thumb: {
      type: SchemaTypes.String,
      required: true,
    },
    description: {
      type: SchemaTypes.String,
    },
    price: {
      type: SchemaTypes.Number,
      required: true,
    },
    quantity: {
      type: SchemaTypes.Number,
      required: true,
    },
    type: {
      type: SchemaTypes.String,
      required: true,
      enum: [DOCUMENT_NAME_CLOTHING, DOCUMENT_NAME_ELECTRONIC],
    },
    shop: {
      type: SchemaTypes.ObjectId,
      ref: "Shop",
    },
    attribute: {
      type: SchemaTypes.Mixed,
      required: true,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

const clothingSchema = new Schema(
  {
    brand: { type: SchemaTypes.String, require: true },
    size: { type: SchemaTypes.String },
    material: { type: SchemaTypes.String },
    shop: {
      type: SchemaTypes.ObjectId,
      ref: "Shop",
    },
  },
  { timestamps: true, collection: COLLECTION_NAME_CLOTHING }
);

const electronicSchema = new Schema(
  {
    manufacturer: { type: SchemaTypes.String, require: true },
    model: { type: SchemaTypes.String },
    color: { type: SchemaTypes.String },
    shop: {
      type: SchemaTypes.ObjectId,
      ref: "Shop",
    },
  },
  { timestamps: true, collection: COLLECTION_NAME_ELECTRONIC }
);
export default model(DOCUMENT_NAME, productSchema);
export const Product = model(DOCUMENT_NAME, productSchema);
export const Clothing = model(DOCUMENT_NAME_CLOTHING, clothingSchema);
export const Electronic = model(DOCUMENT_NAME_ELECTRONIC, electronicSchema);
