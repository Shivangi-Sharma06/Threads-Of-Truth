require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const logsRoutes = require('./routes/logs');
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB error:', err));

// ✅ Clean route mount
app.use('/api/logs', logsRoutes);

app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
