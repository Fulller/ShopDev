import amqp from "amqplib";

async function produce() {
  try {
    const connection = await amqp.connect("amqp://guest:12345@localhost");
    const channel = await connection.createChannel();

    const notificationExchange = "notificationEx";
    const notificationQueue = "notificationQueueProcess";
    const notificationExchangeDLX = "notificationExDLX";
    const notificationRoutingKeyDLX = "notificationRoutingKeyDLX";

    // Create the main notification exchange
    await channel.assertExchange(notificationExchange, "direct", {
      durable: true,
    });

    // Create the dead letter exchange
    await channel.assertExchange(notificationExchangeDLX, "direct", {
      durable: true,
    });

    // Create the queue with dead letter settings
    const queueResult = await channel.assertQueue(notificationQueue, {
      exclusive: false,
      durable: true,
      deadLetterExchange: notificationExchangeDLX,
      deadLetterRoutingKey: notificationRoutingKeyDLX,
    });

    // Bind the queue to the main exchange
    await channel.bindQueue(queueResult.queue, notificationExchange, "");

    const message = "A new product has been created";

    // Send a message with expiration to the queue
    await channel.sendToQueue(queueResult.queue, Buffer.from(message), {
      expiration: "10000", // message expiration time in milliseconds
    });

    console.log(`[x] Sent '${message}'`);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.error("Error:", error);
  }
}

produce();
