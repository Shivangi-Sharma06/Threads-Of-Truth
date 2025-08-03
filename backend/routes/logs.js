const express = require('express');
const router = express.Router();
const VerificationLog = require('../models/VerificationLog');

// Append new log
router.post('/add-log', async (req, res) => {
  const { productId, logEntry } = req.body;

  try {
    let product = await VerificationLog.findOne({ productId });

    if (!product) {
      product = new VerificationLog({
        productId,
        logs: [logEntry]
      });
    } else {
      product.logs.push(logEntry);
    }

    await product.save();
    res.status(200).json({ message: 'Log added successfully', product });
  } catch (err) {
    console.error('Error saving log:', err);
    res.status(500).json({ error: 'Error saving log' });
  }
});

// ✅ Move GET route here BEFORE export
router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await VerificationLog.findOne({ productId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product.logs); // send only logs array
  } catch (err) {
    console.error('Error fetching logs:', err);
    res.status(500).json({ error: 'Error fetching logs' });
  }
});

// ✅ Now export correctly
module.exports = router;
