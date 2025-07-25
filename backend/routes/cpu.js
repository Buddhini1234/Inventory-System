// routes/cpu.js
const express = require('express');
const router = express.Router();
const CPU = require('../models/CPU');

// POST: Add CPU
router.post('/', async (req, res) => {
  try {
    const newCPU = new CPU(req.body);
    await newCPU.save();
    res.status(201).json({ message: 'CPU added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add CPU' });
  }
});

// GET: Get all CPUs
router.get('/', async (req, res) => {
  try {
    const cpus = await CPU.find();
    res.json(cpus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch CPUs' });
  }
});

// ✅ GET: Get single CPU by ID
router.get('/:id', async (req, res) => {
  try {
    const cpu = await CPU.findById(req.params.id);
    if (!cpu) return res.status(404).json({ message: 'CPU not found' });
    res.json(cpu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch CPU' });
  }
});

// ✅ PUT: Update CPU by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCPU = await CPU.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCPU) return res.status(404).json({ message: 'CPU not found' });
    res.json({ message: 'CPU updated successfully', cpu: updatedCPU });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update CPU' });
  }
});

// ✅ DELETE: Delete CPU by ID (if you want to keep delete in one place)
router.delete('/:id', async (req, res) => {
  try {
    const deletedCPU = await CPU.findByIdAndDelete(req.params.id);
    if (!deletedCPU) return res.status(404).json({ message: 'CPU not found' });
    res.json({ message: 'CPU deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete CPU' });
  }
});

module.exports = router;

