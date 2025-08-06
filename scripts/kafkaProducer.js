const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'simulator',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const events = [
  {
    product_id: 'PRD001',
    event_type: 'purchase',
    quantity: 100,
    unit_price: 50,
    timestamp: new Date().toISOString()
  },
  {
    product_id: 'PRD001',
    event_type: 'sale',
    quantity: 40,
    timestamp: new Date().toISOString()
  },
  {
    product_id: 'PRD001',
    event_type: 'purchase',
    quantity: 60,
    unit_price: 55,
    timestamp: new Date().toISOString()
  },
  {
    product_id: 'PRD001',
    event_type: 'sale',
    quantity: 80,
    timestamp: new Date().toISOString()
  }
];

const run = async () => {
  await producer.connect();
  for (const event of events) {
    await producer.send({
      topic: 'inventory-events',
      messages: [{ value: JSON.stringify(event) }]
    });
    console.log('Event sent:', event);
  }
  await producer.disconnect();
};

run().catch(console.error);
