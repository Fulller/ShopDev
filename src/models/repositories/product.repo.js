import { Product, Electronic, Clothing } from "../index.js";
import { Types } from "mongoose";
import createHttpError from "http-errors";
import { getSelectData, getUnselectData } from "../../utils/index.js";

const ProductRepo = {
  query: async function ({ query, limit, skip }) {
    return await Product.find(query)
      .populate("product_shop", "name email -_id")
      .sort({ updateAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
  },
  findAllDraftsForShop: async function ({ query, limit, skip }) {
    return await this.query({ query, limit, skip });
  },
  findAllPublishForShop: async function ({ query, limit, skip }) {
    return await this.query({ query, limit, skip });
  },
  publishProductByShop: async function ({ product_shop, product_id }) {
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
  unpublishProductByShop: async function ({ product_shop, product_id }) {
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
  searchProductByUser: async function ({ keySearch }) {
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
  findAllProducts: async function ({ limit, sort, page, filter, select }) {
    const skip = (page - 1) * limit;
    const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
    return await Product.find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .select(getSelectData(select))
      .lean();
  },
  findProduct: async function ({ product_id, unselect }) {
    return await Product.findById(new Types.ObjectId(product_id))
      .select(getUnselectData(unselect))
      .lean();
  },
};

export default ProductRepo;
