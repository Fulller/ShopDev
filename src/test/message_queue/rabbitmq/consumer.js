import amqp from "amqplib";

const queue = "test_queue";

async function consume() {
  try {
    const connection = await amqp.connect("amqp://guest:12345@localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    console.log(`[*] Waiting for messages in ${queue}. To exit press CTRL+C`);
    channel.consume(
      queue,
      (msg) => {
        if (msg !== null) {
          console.log(`[x] Received '${msg.content.toString()}'`);
          channel.ack(msg);
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

consume();
