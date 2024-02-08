import { ProductService } from "../services/index.js";

import _ from "lodash";

const ProductController = {
  async create(req, res) {
    const shopId = _.get(req, "user._id");
    const payload = _.chain(req)
      .get("body")
      .set("shop", shopId)
      .set("attribute.shop", shopId)
      .value();
    const newProduct = await ProductService.createProduct(payload);
    return res.fly({
      status: 200,
      message: `Create product successfuly`,
      metadata: { payload, product: newProduct },
    });
  },
};

export default ProductController;
