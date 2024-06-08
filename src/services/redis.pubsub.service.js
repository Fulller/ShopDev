import { createClient } from "redis";

class RedisPubSubService {
  constructor() {
    this.publisher = createClient();
    this.subscriber = createClient();

    this.publisher.on("error", (err) =>
      console.error("Redis Publisher Error:", err)
    );
    this.subscriber.on("error", (err) =>
      console.error("Redis Subscriber Error:", err)
    );

    this.connectClients();
  }

  async connectClients() {
    if (!this.publisher.isOpen) {
      await this.publisher.connect();
    }
    if (!this.subscriber.isOpen) {
      await this.subscriber.connect();
    }
  }

  async publish(channel, message) {
    if (!this.publisher.isOpen) {
      await this.publisher.connect();
    }
    return this.publisher.publish(channel, message);
  }

  async subscribe(channel, callback) {
    if (!this.subscriber.isOpen) {
      await this.subscriber.connect();
    }
    await this.subscriber.subscribe(channel, (message) => {
      callback(channel, message);
    });
  }
}

export default new RedisPubSubService();
