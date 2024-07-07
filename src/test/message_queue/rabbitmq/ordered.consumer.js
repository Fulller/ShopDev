import amqp from "amqplib";

async function produce() {
  const queue = "ordered-queue";
  const connection = await amqp.connect("amqp://guest:12345@localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: true });
  await channel.prefetch(1);
  await channel.consume(queue, (message) => {
    setTimeout(async () => {
      console.log(`Received :: ${message.content.toString()}`);
      channel.ack(message);
    }, Math.random() * 1000);
  });
}

produce().catch(console.log);
