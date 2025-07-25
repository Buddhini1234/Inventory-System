const express = require('express');
const router = express.Router();
const Switch = require('../models/Switch');

// POST - Add switch
router.post('/', async (req, res) => {
  try {
    const newSwitch = new Switch(req.body);
    await newSwitch.save();
    res.status(201).json({ message: 'Network switch added successfully' });
  } catch (err) {
    console.error('Error adding switch:', err);
    res.status(500).json({ message: 'Failed to add network switch' });
  }
});

// GET - All switches
router.get('/', async (req, res) => {
  try {
    const switches = await Switch.find();
    res.json(switches);
  } catch (err) {
    console.error('Error fetching switches:', err);
    res.status(500).json({ message: 'Failed to fetch switches' });
  }
});

// ✅ GET - Single switch by ID (required for Edit page)
router.get('/:id', async (req, res) => {
  try {
    const singleSwitch = await Switch.findById(req.params.id);
    if (!singleSwitch) {
      return res.status(404).json({ message: 'Switch not found' });
    }
    res.status(200).json(singleSwitch);
  } catch (err) {
    console.error('Error fetching switch:', err);
    res.status(500).json({ message: 'Failed to fetch switch' });
  }
});

// PUT - Update switch by ID
router.put('/:id', async (req, res) => {
  try {
    await Switch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Switch updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update switch' });
  }
});

// DELETE - Delete switch by ID
router.delete('/:id', async (req, res) => {
  try {
    await Switch.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Switch deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete switch' });
  }
});

module.exports = router;
