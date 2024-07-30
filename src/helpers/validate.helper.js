import Joi from "joi";
import {
  HEADER,
  DISCOUNT_TYPES,
  DISCOUNT_APPLIES_TO,
  ROLE_STATUS,
  ROLE_ACTIONS,
  ROLE_POSSESSIONS,
} from "../configs/const.config.js";

const Joi_ObjectId = Joi.string()
  .pattern(new RegExp("^[0-9a-fA-F]{24}$"))
  .required();
const Joi_HTML = Joi.string()
  .pattern(/<\/?[a-z][\s\S]*>/i, "HTML tags")
  .required();
const APIKeyValidate = {
  add: Joi.object({
    key: Joi.string().required(),
    permissions: Joi.array().items(Joi.string()).required(),
  }),
};
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
    productId: Joi_ObjectId,
    content: Joi.string().required(),
    userId: Joi.number().required(),
    parentId: Joi.string()
      .pattern(new RegExp("^[0-9a-fA-F]{24}$"))
      .allow(null, ""),
  }),
  deleteComment: Joi.object({
    productId: Joi_ObjectId,
    commentId: Joi_ObjectId,
  }),
};
const UploadValidate = {
  singleFile: Joi.any().required().messages({
    "any.required": "There must be a file",
  }),
  deleteImage: Joi.object({
    imageUrl: Joi.string().uri().required(),
  }),
  deleteFile: Joi.object({
    fileUrl: Joi.string().uri().required(),
  }),
};

const RBACValidate = {
  newRole: Joi.object({
    rol_name: Joi.string().required(),
    rol_slug: Joi.string().required(),
    rol_status: Joi.string()
      .valid(...Object.values(ROLE_STATUS))
      .required(),
    rol_grants: Joi.array().items({
      resource: Joi_ObjectId,
      action: Joi.string()
        .valid(...Object.values(ROLE_ACTIONS))
        .required(),
      possession: Joi.string()
        .valid(...Object.values(ROLE_POSSESSIONS))
        .required(),
      attribute: Joi.string(),
    }),
  }),
  newResource: Joi.object({
    src_name: Joi.string().required(),
    src_slug: Joi.string().required(),
    src_description: Joi.string(),
  }),
  addGrantToRole: Joi.object({
    role_id: Joi_ObjectId,
    resource: Joi_ObjectId,
    action: Joi.string()
      .valid(...Object.values(ROLE_ACTIONS))
      .required(),
    possession: Joi.string()
      .valid(...Object.values(ROLE_POSSESSIONS))
      .required(),
    attribute: Joi.string(),
  }),
  removeGrantFromRole: Joi.object({
    role_id: Joi_ObjectId,
    grant_id: Joi_ObjectId,
  }),
  updateGrantInRole: Joi.object({
    role_id: Joi_ObjectId,
    grant_id: Joi_ObjectId,
    resource: Joi_ObjectId,
    action: Joi.string().valid(...Object.values(ROLE_ACTIONS)),
    possession: Joi.string().valid(...Object.values(ROLE_POSSESSIONS)),
    attribute: Joi.string(),
  }),
};
const TemplateValidate = {
  add: Joi.object({
    tem_id: Joi.number().required(),
    tem_name: Joi.string().required(),
    tem_html: Joi_HTML,
  }),
};
const UserValidate = {
  signUp: Joi.object({ email: Joi.string().email().required() }),
};
export {
  ShopValidate,
  ProductValidate,
  DiscountValidate,
  CommentValidate,
  UploadValidate,
  APIKeyValidate,
  RBACValidate,
  TemplateValidate,
  UserValidate,
};
