import amqp from "amqplib";

async function produce() {
  const queue = "ordered-queue";
  const connection = await amqp.connect("amqp://guest:12345@localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: true });

  for (let i = 1; i <= 10; i++) {
    await channel.sendToQueue(queue, Buffer.from(`Order :: ${i}`));
  }
  setTimeout(async () => {
    await channel.close();
    await connection.close();
  }, 1000);
}

produce().catch(console.log);
