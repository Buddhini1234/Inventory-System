// models/ups.js
const mongoose = require('mongoose');

const CPUSchema = new mongoose.Schema({
  purchasedFrom: { type: String, default: 'Institute: NIFS' }, // fixed default
  inventoryNumber: { type: String, required: true },
  equipment: { type: String, required: true },
  makeModel: { type: String, required: true },
  serialNumber: String,
  powerRating: String,
  upsType: String,
  fullLoadBackupTime: String,
  remoteShutdown: String,
  batteryType: String,
  batterySize: String,
  overloadAlarm: String,
  inputVoltageRange: String,
  outputVoltageRange: String,
  rechargeTime: String,
  parallelPort: String,
  usbPort: String,
  lcdIndicator: String,
  dataCable: String,
  powerCable: String,
  interface: String,
  otherFeatures: String,
  location: String,
  purchaseDate: String,
  totalCost: String,
  warranty: String,
  maintainedBy: String,
  otherInformation: String,
  connectedFolios: String
});

module.exports = mongoose.model('CPU', CPUSchema);

