const express = require('express')
const router = express.Router()
const Event = require('../models/Event')
const protect = require('../middleware/authMiddleware')

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
    res.json(events)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// GET single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }
    res.json(event)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// POST create event
router.post('/', protect, async (req, res) => {
  try {
    const { title, category, date, location, seats, description, emoji } = req.body
    const event = await Event.create({
      title, category, date, location, seats, description, emoji,
      createdBy: req.user.id
    })
    res.status(201).json(event)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// PUT edit event
router.put('/:id', protect, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(event)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// DELETE event
router.delete('/:id', protect, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id)
    res.json({ message: 'Event deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router