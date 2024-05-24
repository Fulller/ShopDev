import { ProductService } from "../services/index.js";

import _ from "lodash";

const ProductController = {
  async create(req, res) {
    const product_shop = _.get(req, "user._id");
    const payload = _.chain(req)
      .get("body")
      .set("product_shop", product_shop)
      .set("product_attributes.shop", product_shop)
      .value();
    const newProduct = await ProductService.createProduct(payload);
    return res.fly({
      status: 200,
      message: `Create product successfuly`,
      metadata: newProduct,
    });
  },
  async updateProduct(req, res) {
    const product_id = _.get(req, "params.id");
    const product_shop = _.get(req, "user._id");
    const payload = req.body;
    const product = await ProductService.updateProduct({
      product_id,
      product_shop,
      payload,
    });
    return res.fly({
      status: 200,
      message: `Update product successfuly`,
      metadata: product,
    });
  },
  async getAllDraftsForShop(req, res) {
    const product_shop = _.get(req, "user._id");
    const drafts = await ProductService.findAllDraftsForShop({
      product_shop,
    });
    return res.fly({
      status: 200,
      message: `Get all draft for shop successfuly`,
      metadata: drafts,
    });
  },
  async getAllPublishForShop(req, res) {
    const product_shop = _.get(req, "user._id");
    const publishes = await ProductService.findAllPublishForShop({
      product_shop,
    });
    return res.fly({
      status: 200,
      message: `Get all publishes for shop successfuly`,
      metadata: publishes,
    });
  },
  async publishProductByShop(req, res) {
    const product_shop = _.get(req, "user._id");
    const product_id = _.get(req, "params.id");
    const data = await ProductService.publishProductByShop({
      product_shop,
      product_id,
    });
    return res.fly({
      status: 200,
      message: `Public product by shop successfuly`,
      metadata: data,
    });
  },
  async unpublishProductByShop(req, res) {
    const product_shop = _.get(req, "user._id");
    const product_id = _.get(req, "params.id");
    const data = await ProductService.unpublishProductByShop({
      product_shop,
      product_id,
    });
    return res.fly({
      status: 200,
      message: `Unpublic product by shop successfuly`,
      metadata: data,
    });
  },
  async searchProductByuser(req, res) {
    const keySearch = _.get(req, "params.keySearch");
    console.log({ keySearch });
    const results = await ProductService.searchProductByUser({
      keySearch,
    });
    return res.fly({
      status: 200,
      message: `Search product by user successfully`,
      metadata: results,
    });
  },
  async getAllProducts(req, res) {
    const { limit, sort, page } = req.query;
    const products = await ProductService.findAllProducts({
      limit,
      sort,
      page,
    });
    return res.fly({
      status: 200,
      message: "Get all product successfully",
      metadata: products,
    });
  },
  async getProduct(req, res) {
    const product_id = _.get(req, "params.id");
    const product = await ProductService.findProduct({
      product_id,
    });
    return res.fly({
      status: 200,
      message: `Get product ${product_id} successfully`,
      metadata: product,
    });
  },
};

export default ProductController;
