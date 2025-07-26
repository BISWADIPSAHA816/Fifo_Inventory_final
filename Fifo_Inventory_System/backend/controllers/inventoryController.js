const db = require('../db');
const { calculateInventory } = require('../services/fifoService');

exports.getStockOverview = async (req, res) => {
  try {
    const result = await calculateInventory();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTransactionLedger = async (req, res) => {
  try {
    const ledger = await db.query('SELECT * FROM sales ORDER BY timestamp DESC');
    res.json(ledger.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
