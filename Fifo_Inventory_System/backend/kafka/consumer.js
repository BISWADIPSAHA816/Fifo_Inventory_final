const { Kafka } = require('kafkajs');
const db = require('../db');

const kafka = new Kafka({
  clientId: 'inventory-app',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'inventory-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'inventory-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      const { product_id, event_type, quantity, unit_price, timestamp } = event;

      if (event_type === 'purchase') {
        await db.query(
          'INSERT INTO inventory_batches (product_id, quantity, unit_price, timestamp) VALUES ($1, $2, $3, $4)',
          [product_id, quantity, unit_price, timestamp]
        );
      } else if (event_type === 'sale') {
        let remainingQty = quantity;
        const batches = await db.query(
          'SELECT * FROM inventory_batches WHERE product_id = $1 AND quantity > 0 ORDER BY timestamp ASC',
          [product_id]
        );

        let totalCost = 0;
        for (const batch of batches.rows) {
          if (remainingQty === 0) break;
          const consumeQty = Math.min(batch.quantity, remainingQty);
          totalCost += consumeQty * batch.unit_price;

          await db.query(
            'UPDATE inventory_batches SET quantity = quantity - $1 WHERE id = $2',
            [consumeQty, batch.id]
          );
          remainingQty -= consumeQty;
        }

        await db.query(
          'INSERT INTO sales (product_id, quantity, total_cost, timestamp) VALUES ($1, $2, $3, $4)',
          [product_id, quantity, totalCost, timestamp]
        );
      }
    }
  });
};

run().catch(console.error);
