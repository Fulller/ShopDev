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
    name: Joi.string().required(),
    thumb: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    type: Joi.string().required(),
    attribute: Joi.any(),
  }),
};
export { ShopValidate, ProductValidate };
