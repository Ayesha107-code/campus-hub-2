const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')

// dummy notifications for now
// later you can create a Notification model and save real ones
const notifications = [
  {
    id: 1,
    title: 'Registration Confirmed',
    message: 'You have successfully registered for Hackathon 2026.',
    time: '2 hours ago',
    read: false
  },
  {
    id: 2,
    title: 'Event Reminder',
    message: 'Spring Concert is tomorrow at Main Auditorium.',
    time: '5 hours ago',
    read: false
  },
  {
    id: 3,
    title: 'New Event Added',
    message: 'Career Fair has been added. Register now!',
    time: '1 day ago',
    read: true
  },
  {
    id: 4,
    title: 'Event Updated',
    message: 'Sports Finals location has been changed to Main Sports Ground.',
    time: '2 days ago',
    read: true
  },
]


router.get('/', protect, (req, res) => {
  res.json(notifications)
})

module.exports = router