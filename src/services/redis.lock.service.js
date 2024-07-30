import redis from "redis";
import { promisify } from "util";
import InventoryRepo from "../models/repositories/inventory.repo.js";
const redisClient = redis.createClient();
const pexpire = promisify(redisClient.pExpire).bind(redisClient);
const setnxAsync = promisify(redisClient.setEx).bind(redisClient);

const RedisService = {
  async acquireLock(productId, quantity, cartId) {
    const key = `lock_v2023_$${productId}`;
    const retryTimes = 10;
    const expireTime = 3000;
    for (let i = 0; i < retryTimes; i++) {
      const result = await setnxAsync(key, expireTime);
      console.log(`result :: `, result);
      if (result == 1) {
        const isReservation = await InventoryRepo.resercationInventory({
          productId,
          quantity,
          cartId,
        });
        if (isReservation.modifiedCount) {
          await pexpire(key, expireTime);
          return key;
        }
        return null;
      } else {
        await new Promise((resole) => {
          setTimeout(resole, 50);
        });
      }
    }
  },
  async releaseLock(keyLock) {
    const delAsyncKey = promisify(redisClient.del).bind(redisClient);
    return await delAsyncKey(keyLock);
  },
};

export default RedisService;
