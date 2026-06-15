const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

// middleware
app.use(cors())
app.use(express.json())
//routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))
app.use('/api/registrations', require('./routes/registrations'))
app.use('/api/notifications', require('./routes/notifications'))

// test route
app.get('/', (req, res) => {
  res.json({ message: 'Campus Hub API is running!' })
})

// connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected!')
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err)
  })

  