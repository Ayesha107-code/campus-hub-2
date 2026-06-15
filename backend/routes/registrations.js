const express = require('express')
const router = express.Router()
const Registration = require('../models/Registration')
const protect = require('../middleware/authMiddleware')

// Register for event
router.post('/', protect, async (req, res) => {
  try {
    const { eventId } = req.body

    const existing = await Registration.findOne({
      user: req.user.id,
      event: eventId
    })
    if (existing) {
      return res.status(400).json({ message: 'Already registered' })
    }

    const registration = await Registration.create({
      user: req.user.id,
      event: eventId
    })

    res.status(201).json({ message: 'Registered successfully', registration })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Get my registrations
router.get('/my', protect, async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user.id })
      .populate('event')
    res.json(registrations)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Cancel registration
router.delete('/:id', protect, async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id)
    res.json({ message: 'Registration cancelled' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router