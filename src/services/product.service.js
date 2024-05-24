import { Product, Clothing, Electronic } from "../models/index.js";
import ProductRepo from "../models/repositories/product.repo.js";
import createHttpError from "http-errors";
import _ from "lodash";

export default class ProductFactory {
  static productRegistry = {};
  static registerTypeProduct(type, classRef) {
    ProductFactory.productRegistry[type] = classRef;
  }
  static async createProduct(payload) {
    const type = _.get(payload, "product_type");
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) throw createHttpError(400, "Invalid product type");
    return new productClass(payload).createProduct();
  }
  static async findAllDraftsForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isDraft: true };
    return await ProductRepo.findAllDraftsForShop({ query, limit, skip });
  }
  static async findAllPublishForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isPublished: true };
    return await ProductRepo.findAllPublishForShop({ query, limit, skip });
  }
  static async publishProductByShop({ product_shop, product_id }) {
    return await ProductRepo.publishProductByShop({ product_shop, product_id });
  }
  static async unpublishProductByShop({ product_shop, product_id }) {
    return await ProductRepo.unpublishProductByShop({
      product_shop,
      product_id,
    });
  }
  static async searchProductByUser({ keySearch }) {
    return await ProductRepo.searchProductByUser({
      keySearch,
    });
  }
  static async findAllProducts({
    limit = 50,
    sort = "ctime",
    page = 1,
    filter = { isPublished: true },
    select = ["product_name", "product_price", "product_thumb"],
  }) {
    return await ProductRepo.findAllProducts({
      limit,
      sort,
      page,
      filter,
      select,
    });
  }
  static async findProduct({ product_id, unselect = ["__v"] }) {
    return await ProductRepo.findProduct({
      product_id,
      unselect,
    });
  }
}

class ProductService {
  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_shop,
    product_attribute,
  }) {
    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_shop = product_shop;
    this.product_attribute = product_attribute;
  }
  async createProduct() {
    return await Product.create(this);
  }
}

class ClothingService extends ProductService {
  async createProduct() {
    const newClothing = await Clothing.create(this.product_attribute);
    if (_.isEmpty(newClothing)) {
      throw createHttpError(400, "Create new clothing is error");
    }
    this._id = newClothing._id;
    const newProduct = await super.createProduct();
    if (_.isEmpty(newProduct)) {
      throw createHttpError(400, "Create new product is error");
    }
    return newProduct;
  }
}
ProductFactory.registerTypeProduct("Clothing", ClothingService);

class ElectronicService extends ProductService {
  async createProduct() {
    const newElectronic = await Electronic.create(this.product_attribute);
    if (_.isEmpty(newElectronic)) {
      throw createHttpError(400, "Create new electronic is error");
    }
    this._id = newElectronic._id;
    const newProduct = await super.createProduct();
    if (_.isEmpty(newProduct)) {
      throw createHttpError(400, "Create new product is error");
    }
    return newProduct;
  }
}
ProductFactory.registerTypeProduct("Electronic", ElectronicService);
