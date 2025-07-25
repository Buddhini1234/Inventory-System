// models/cpu.js
const mongoose = require('mongoose');

const CPUSchema = new mongoose.Schema({
  makeModel: { type: String, required: true },
  type: { type: String, required: true },
  inventoryNumber: { type: String, required: true },
  serialNumber: { type: String, required: true },
  location: { type: String, required: true },
  processorSpeed: String,
  ram: String,
  hdd: String,
  os: String,
  totalCost: String,
  maintainedBy: String,
  warranty: String,
  importantInfo: String,
  purchaseDate: String
});

module.exports = mongoose.model('CPU', CPUSchema);
