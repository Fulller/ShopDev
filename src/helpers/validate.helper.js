import Joi from "joi";
import { HEADER } from "../configs/const.config.js";

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
export { ShopValidate, ProductValidate };
