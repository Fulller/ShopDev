import { Product, Clothing, Electronic } from "../models/index.js";
import createHttpError from "http-errors";
import _ from "lodash";

export default class ProductFactory {
  static productRegistry = {};
  static registerTypeProduct(type, classRef) {
    ProductFactory.productRegistry[type] = classRef;
  }
  static async createProduct(payload) {
    const type = _.get(payload, "type");
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) throw createHttpError(400, "Invalid product type");
    return new productClass(payload).createProduct();
  }
}

class ProductService {
  constructor({
    name,
    thumb,
    description,
    price,
    quantity,
    type,
    shop,
    attribute,
  }) {
    this.name = name;
    this.thumb = thumb;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.type = type;
    this.shop = shop;
    this.attribute = attribute;
  }
  async createProduct() {
    return await Product.create(this);
  }
}

class ClothingService extends ProductService {
  async createProduct() {
    const { _id } = await Clothing.create(this.attribute);
    this._id = _id;
    const newProduct = await super.createProduct();
    return newProduct;
  }
}
ProductFactory.registerTypeProduct("Clothing", ClothingService);

class ElectronicService extends ProductService {
  async createProduct() {
    const { _id } = await Electronic.create(this.attribute);
    this._id = _id;
    const newProduct = await super.createProduct();
    return newProduct;
  }
}
ProductFactory.registerTypeProduct("Electronic", ElectronicService);
