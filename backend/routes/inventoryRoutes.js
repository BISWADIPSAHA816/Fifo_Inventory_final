const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/inventory', inventoryController.getStockOverview);
router.get('/ledger', inventoryController.getTransactionLedger);

module.exports = router;
