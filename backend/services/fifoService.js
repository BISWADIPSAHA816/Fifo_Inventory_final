const db = require('../db');

exports.calculateInventory = async () => {
  // const products = await db.query('SELECT * FROM products');
  // const inventory = [];

  // for (const product of products.rows) {
  //   const batches = await db.query(
  //     'SELECT * FROM inventory_batches WHERE product_id = $1 ORDER BY timestamp ASC',
  //     [product.product_id]
  //   );

  //   let totalQty = 0;
  //   let totalCost = 0;
  //   batches.rows.forEach(batch => {
  //     totalQty += batch.quantity;
  //     totalCost += batch.quantity * batch.unit_price;
  //   });

  //   inventory.push({
  //     product_id: product.product_id,
  //     current_quantity: totalQty,
  //     total_cost: totalCost.toFixed(2),
  //     avg_cost_per_unit: (totalQty ? (totalCost / totalQty).toFixed(2) : 0)
  //   });
  // }

  // return inventory;
  const result = await db.query('SELECT product_id, product_name FROM products ORDER BY product_id ASC');
  return result.rows;
};
