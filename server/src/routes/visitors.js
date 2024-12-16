const express = require('express');
const router = express.Router();
const Visitor = require('../models/visitor');

// Add new visitor
router.post('/', async (req, res) => {
  try {
    const visitor = new Visitor({
      name: req.body.name
    });
    await visitor.save();
    res.status(201).json(visitor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all visitors
router.get('/', async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ timestamp: -1 });
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
