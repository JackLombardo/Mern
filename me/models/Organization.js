// models/Organization.js
const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: String,
  address: String,
  // Add other fields as needed
});

module.exports = mongoose.model('Organization', organizationSchema);