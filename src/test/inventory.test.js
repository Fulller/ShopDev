import RedisPubsubService from "../services/redis.pubsub.service.js";

class InventoryServiceTest {
  constructor() {
    RedisPubsubService.subscribe("purchase_events", (channel, message) => {
      console.log(`recieve :: ${message}`);
      InventoryServiceTest.updateInventory(message);
    });
  }
  static updateInventory(productId, quantity) {
    console.log(`Product ${productId}, quantity ${quantity}`);
  }
}

export default new InventoryServiceTest();
