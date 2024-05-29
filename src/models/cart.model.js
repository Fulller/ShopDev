import { Schema, SchemaTypes, model } from "mongoose";
import { CART_STATES } from "../configs/const.config.js";

const DOCUMENT_NAME = "Cart";
const COLLECTION_NAME = "Carts";

const cartSchema = new Schema(
  {
    cart_state: {
      type: SchemaTypes.String,
      enum: Object.values(CART_STATES),
      default: CART_STATES.ACTIVE,
    },
    cart_products: {
      type: [SchemaTypes.Mixed],
      default: [],
      required: true,
    },
    cart_count_products: { type: SchemaTypes.Number, default: 0 },
    // ref: "User"
    cart_userId: { type: SchemaTypes.Number, required: true },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, cartSchema);
