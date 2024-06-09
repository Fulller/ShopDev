import Joi from "joi";
import {
  HEADER,
  DISCOUNT_TYPES,
  DISCOUNT_APPLIES_TO,
} from "../configs/const.config.js";

const ShopValidate = {
  signUp: Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(1).max(100).required(),
    password: Joi.string().min(6).max(100).required(),
  }),
  logIn: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
  }),
  logOut: Joi.object({
    [HEADER.REFRESHTOKEN]: Joi.string().required(),
  }),
  refreshToken: Joi.object({
    [HEADER.REFRESHTOKEN]: Joi.string().required(),
  }),
};
const ProductValidate = {
  create: Joi.object({
    product_name: Joi.string().required(),
    product_thumb: Joi.string().required(),
    product_description: Joi.string(),
    product_price: Joi.number().required(),
    product_quantity: Joi.number().required(),
    product_type: Joi.string().required(),
    product_attributes: Joi.any(),
  }),
};
const DiscountValidate = {
  createDiscountByShop: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string()
      .valid(...Object.values(DISCOUNT_TYPES))
      .required(),
    value: Joi.number().required(),
    code: Joi.string(),
    start_date: Joi.date().required().greater("now").messages({
      "date.greater":
        "start_date must be greater than or equal to the current date",
    }),
    end_date: Joi.date().required().greater(Joi.ref("start_date")).messages({
      "date.greater": "end_date must be greater than start_date",
    }),
    max_uses: Joi.number().required(),
    users_used: Joi.array(),
    max_uses_per_user: Joi.number().required(),
    min_order_value: Joi.number().required(),
    is_active: Joi.bool(),
    applies_to: Joi.string()
      .valid(...Object.values(DISCOUNT_APPLIES_TO))
      .required(),
    product_ids: Joi.array(),
  }).with("start_date", "end_date"),
};

const CommentValidate = {
  addComment: Joi.object({
    productId: Joi.string().pattern(new RegExp("^[0-9a-fA-F]{24}$")).required(),
    content: Joi.string().required(),
    userId: Joi.number().required(),
    parentId: Joi.string()
      .pattern(new RegExp("^[0-9a-fA-F]{24}$"))
      .allow(null, ""),
  }),
  deleteComment: Joi.object({
    productId: Joi.string().pattern(new RegExp("^[0-9a-fA-F]{24}$")).required(),
    commentId: Joi.string().pattern(new RegExp("^[0-9a-fA-F]{24}$")).required(),
  }),
};
export { ShopValidate, ProductValidate, DiscountValidate, CommentValidate };
