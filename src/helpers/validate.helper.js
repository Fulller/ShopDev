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
  beforeForgotPassword: Joi.object({ email: Joi.string().email().required() }),
  afterForgotPassword: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    token: Joi.any().required(),
  }),
  logIn: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  verifySignUpOTP: Joi.object({
    email: Joi.string().email().required(),
    token: Joi.any().required(),
  }),
};
const SPUValidate = {
  create: Joi.object({
    spu_slug: Joi.string().required().messages({
      "string.base": "Slug phải là một chuỗi ký tự",
      "string.empty": "Slug không được để trống",
      "any.required": "Slug là bắt buộc",
    }),
    spu_name: Joi.string().required().messages({
      "string.base": "Tên phải là một chuỗi ký tự",
      "string.empty": "Tên không được để trống",
      "any.required": "Tên là bắt buộc",
    }),
    spu_description: Joi.string().required().messages({
      "string.base": "Mô tả phải là một chuỗi ký tự",
      "string.empty": "Mô tả không được để trống",
      "any.required": "Mô tả là bắt buộc",
    }),
    spu_category: Joi.array()
      .items(Joi.string().required())
      .required()
      .messages({
        "array.base": "Danh mục phải là một mảng các chuỗi",
        "array.empty": "Danh mục không được để trống",
        "any.required": "Danh mục là bắt buộc",
      }),
    spu_brand: Joi.string().required().messages({
      "string.base": "Thương hiệu phải là một chuỗi ký tự",
      "string.empty": "Thương hiệu không được để trống",
      "any.required": "Thương hiệu là bắt buộc",
    }),
    spu_images: Joi.array()
      .items(Joi.string().uri().required())
      .required()
      .messages({
        "array.base": "Ảnh phải là một mảng các URI chuỗi",
        "array.empty": "Ảnh không được để trống",
        "any.required": "Ảnh là bắt buộc",
      }),
    spu_variations: Joi.array().items(
      Joi.object({
        name: Joi.string().required().messages({
          "string.base": "Tên biến thể phải là một chuỗi ký tự",
          "string.empty": "Tên biến thể không được để trống",
          "any.required": "Tên biến thể là bắt buộc",
        }),
        images: Joi.array().items(Joi.string().uri()).messages({
          "array.base": "Ảnh của biến thể phải là một mảng các URI chuỗi",
        }),
        options: Joi.array().items(Joi.string()).messages({
          "array.base": "Các tùy chọn của biến thể phải là một mảng các chuỗi",
        }),
      })
    ),
  }),
};
const SKUValidate = {
  create: Joi.object({
    sku_spu: Joi_ObjectId,
    sku_tier_idx: Joi.array()
      .items(Joi.number())
      .default([0])
      .label("Tier Index"),
    sku_default: Joi.boolean().default(false).label("Default SKU"),
    sku_slug: Joi.string().required().label("SKU Slug"),
    sku_price: Joi.number().positive().required().label("Price"),
    sku_stock: Joi.number().integer().min(0).required().label("Stock"),
    sku_images: Joi.array()
      .items(Joi.string().uri())
      .default([])
      .label("Images"),
    isPublished: Joi.boolean().default(false).label("Published Status"),
    isDraft: Joi.boolean().default(true).label("Draft Status"),
    isDeleted: Joi.boolean().default(false).label("Deleted Status"),
  }),
  lookup: Joi.object({
    sku_spu: Joi_ObjectId,
    sku_tier_idx: Joi.array()
      .items(Joi.number())
      .default([0])
      .label("Tier Index"),
  }),
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
  SPUValidate,
  SKUValidate,
};
