// models/Switch.js
const mongoose = require('mongoose');

const SwitchSchema = new mongoose.Schema({
  purchasedFrom: { type: String, default: 'Institute NIFS' },
  inventoryNumber: { type: String, required: true }, // ✅ Added this line
  equipment: String,
  makeModel: String,
  serialNo: String,
  noOfPorts: String,
  portStatusIndicators: String,
  transmissionModes: String,
  baudRates: String,
  negotiation: String,
  mounting: String,
  otherFeatures: String,
  powerCables: String,
  location: String,
  purchaseDate: String,
  totalCost: String,
  warranty: String,
  maintainedBy: String,
  otherInfo: String,
  connectedFolios: String,
  certificate: String
});

module.exports = mongoose.model('Switch', SwitchSchema);

