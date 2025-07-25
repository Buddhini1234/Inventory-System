const express = require('express');
const router = express.Router();
const Computer = require('../models/Computer');

// POST route to add computer
router.post('/', async (req, res) => {
  try {
    const newComputer = new Computer(req.body);
    await newComputer.save();
    res.status(201).json({ message: 'Computer added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add computer' });
  }
});

router.get('/', async (req, res) => {
  try {
    const computers = await Computer.find();
    res.status(200).json(computers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch computers' });
  }
});

// DELETE a computer
router.delete('/:id', async (req, res) => {
  try {
    await Computer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Computer deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete' });
  }
});

// GET one computer by id
router.get('/:id', async (req, res) => {
  try {
    const comp = await Computer.findById(req.params.id);
    if (!comp) return res.status(404).json({ message: 'Computer not found' });
    res.json(comp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch computer' });
  }
});

// PUT update a computer by id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Computer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Computer not found' });
    res.json({ success: true, updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update computer' });
  }
});

module.exports = router;
