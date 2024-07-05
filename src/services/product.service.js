import { Types } from "mongoose";
import { Product, Clothing, Electronic } from "../models/index.js";
import ProductRepo from "../models/repositories/product.repo.js";
import InventoryRepo from "../models/repositories/inventory.repo.js";
import NotificationService from "./notification.service.js";
import createHttpError from "http-errors";
import _ from "lodash";
import { removeNullUndefined, updateNested } from "../utils/index.js";

export default class ProductFactory {
  static productRegistry = {};
  static registerTypeProduct(type, classRef) {
    ProductFactory.productRegistry[type] = classRef;
  }
  static async createProduct(payload) {
    const type = _.get(payload, "product_type");
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) throw createHttpError(400, "Invalid product type");
    return await new productClass(payload).createProduct();
  }
  static async updateProduct({ product_id, product_shop, payload }) {
    const type = _.get(payload, "product_type");
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) throw createHttpError(400, "Invalid product type");
    return await new productClass(removeNullUndefined(payload)).updateProduct(
      product_id
    );
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
    select = ["product_name", "product_price", "product_thumb", "product_shop"],
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
    product_attributes,
  }) {
    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_shop = product_shop;
    this.product_attributes = product_attributes;
  }
  async createProduct() {
    const newProduct = await Product.create(this);
    if (!newProduct) throw createHttpError(400, "Cannot create new product");
    await InventoryRepo.insertInventory({
      inven_productId: newProduct._id,
      inven_shopId: this.product_shop,
      inven_stock: this.product_quantity,
    });
    NotificationService.pushNotiToSystem({
      senderId: this.product_shop,
      options: {
        product_name: this.product_name,
        shop_name: this.product_shop,
      },
    })
      .then(console.log)
      .catch(console.error);
    return newProduct;
  }
  async updateProduct({ product_id, payload }) {
    return await ProductRepo.updateProductById({
      product_id,
      payload,
      Model: Product,
    });
  }
}

class ClothingService extends ProductService {
  async createProduct() {
    const newClothing = await Clothing.create(this.product_attributes);
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
  async updateProduct(product_id) {
    const payload = this;
    if (payload.product_attributes) {
      await ProductRepo.updateProductById({
        product_id,
        payload: payload.product_attributes,
        Model: Clothing,
      });
    }
    const updatedProduct = await super.updateProduct({ product_id, payload });
    return updatedProduct;
  }
}
ProductFactory.registerTypeProduct("Clothing", ClothingService);

class ElectronicService extends ProductService {
  async createProduct() {
    const newElectronic = await Electronic.create(this.product_attributes);
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
  async updateProduct(product_id) {
    const payload = this;
    if (payload.product_attributes) {
      await ProductRepo.updateProductById({
        product_id,
        payload: payload.product_attributes,
        Model: Electronic,
      });
    }
    const updatedProduct = await super.updateProduct({
      product_id,
      payload: payload,
    });
    return updatedProduct;
  }
}
ProductFactory.registerTypeProduct("Electronic", ElectronicService);
