const express = require('express');
const router = express.Router();
const Computer = require('../models/Computer');
const CPU = require('../models/CPU');
const Switch = require('../models/Switch');

router.get('/', async (req, res) => {
  try {
    const computers = await Computer.countDocuments();
    const cpus = await CPU.countDocuments();
    const switches = await Switch.countDocuments();
    res.json({ computers, cpus, switches });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
});

module.exports = router;
