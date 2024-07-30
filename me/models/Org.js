const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  orgName: { type: String, required: true, },
  adminEmail: {type: Array, required: true, },
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
