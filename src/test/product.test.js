import RedisPubsubService from "../services/redis.pubsub.service.js";

const ProductServiceTest = {
  async purchaseProduct(productId, quantity) {
    const order = { productId, quantity };
    RedisPubsubService.publish("purchase_events", JSON.stringify(order));
  },
};

export default ProductServiceTest;
