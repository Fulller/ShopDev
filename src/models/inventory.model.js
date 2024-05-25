import { Schema, SchemaTypes, model } from "mongoose";

const DOCUMENT_NAME = "Inventory";
const COLLECTION_NAME = "Inventories";

const inventorySchema = new Schema(
  {
    inven_productId: { type: SchemaTypes.ObjectId, ref: "Product" },
    inven_shopId: { type: SchemaTypes.ObjectId, ref: "Shop" },
    inven_stock: { type: SchemaTypes.Number, require: true },
    inven_location: { type: SchemaTypes.String, default: "unknow" },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, inventorySchema);
