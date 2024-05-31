import { Product, Electronic, Clothing } from "../index.js";
import { Types } from "mongoose";
import createHttpError from "http-errors";
import {
  getSelectData,
  getUnselectData,
  updateNested,
  toObjectId,
} from "../../utils/index.js";

const ProductRepo = {
  async getProductById(id) {
    return await Product.findById(toObjectId(id)).lean();
  },
  async query({ query, limit, skip }) {
    return await Product.find(query)
      .populate("product_shop", "name email -_id")
      .sort({ updateAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
  },
  async findAllDraftsForShop({ query, limit, skip }) {
    return await this.query({ query, limit, skip });
  },
  async findAllPublishForShop({ query, limit, skip }) {
    return await this.query({ query, limit, skip });
  },
  async publishProductByShop({ product_shop, product_id }) {
    const foundProduct = await Product.findOne({
      _id: new Types.ObjectId(product_id),
      product_shop: new Types.ObjectId(product_shop),
    });
    if (!foundProduct) throw createHttpError(404, "Not found product");
    foundProduct.isDraft = false;
    foundProduct.isPublished = true;
    await foundProduct.save();
    // const { modifiedCount } = await Product.update(foundProduct);
    return foundProduct;
  },
  async unpublishProductByShop({ product_shop, product_id }) {
    const foundProduct = await Product.findOne({
      _id: new Types.ObjectId(product_id),
      product_shop: new Types.ObjectId(product_shop),
    });
    if (!foundProduct) throw createHttpError(404, "Not found product");
    foundProduct.isDraft = true;
    foundProduct.isPublished = false;
    await foundProduct.save();
    // const { modifiedCount } = await Product.update(foundProduct);
    return foundProduct;
  },
  async searchProductByUser({ keySearch }) {
    const regexSearch = new RegExp(keySearch);
    const results = await Product.find(
      {
        isPublished: true,
        $text: { $search: regexSearch },
      },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .lean();
    return results;
  },
  async findAllProducts({ limit, sort, page, filter, select }) {
    const skip = (page - 1) * limit;
    const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
    return await Product.find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .select(getSelectData(select))
      .lean();
  },
  async findProduct({ product_id, unselect }) {
    return await Product.findById(new Types.ObjectId(product_id))
      .select(getUnselectData(unselect))
      .lean();
  },
  async updateProductById({ product_id, payload, Model, isNew = true }) {
    return await Model.findByIdAndUpdate(
      product_id,
      { $set: updateNested(payload) },
      {
        new: isNew,
      }
    );
  },
  async checkProductByServer(products) {
    return await Promise.all(
      products.map(async (product) => {
        const foundProduct = await ProductRepo.getProductById(
          product.productId
        );
        if (foundProduct) {
          return {
            price: foundProduct.product_price,
            quantity: product.quantity,
            productId: product.productId,
          };
        }
      })
    );
  },
};

export default ProductRepo;
