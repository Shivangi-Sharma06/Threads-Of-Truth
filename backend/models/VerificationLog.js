const mongoose = require('mongoose');

const logEntrySchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  verifierRole: String,
  status: String,
  txHash: String,
  message: String
});

const verificationLogSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  logs: [logEntrySchema]
});

module.exports = mongoose.model('VerificationLog', verificationLogSchema);
