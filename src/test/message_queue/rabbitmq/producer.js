import amqp from "amqplib";

const queue = "test_queue";
const message = "Hello RabbitMQ!";

async function produce() {
  try {
    const connection = await amqp.connect("amqp://guest:12345@localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`[x] Sent '${message}'`);
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error("Error:", error);
  }
}

produce();
