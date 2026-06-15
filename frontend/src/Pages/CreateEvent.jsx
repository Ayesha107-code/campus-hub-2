import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './CreateEvent.module.css'
import axios from '../api/axios'
import { useAuth } from '../context/AuthContext'

const CreateEvent = () => {
 
  const navigate = useNavigate()
  const { token } = useAuth()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Tech')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [seats, setSeats] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!title || !date || !location || !seats || !description) {
      setError('Please fill in all fields')
      return
    }

    

    try {
      setLoading(true)
      await axios.post('/events', {
        title, category, date, location,
        seats: Number(seats), description
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      alert('Event created successfully!')
      navigate('/events')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event')
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h3 className={styles.title}>Create Event</h3>

        {error && <p className={styles.error}>{error}</p>}

        <input
          type="text"
          placeholder="Enter event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.input}
        >
          <option value="Tech">Tech</option>
          <option value="Career">Career</option>
          <option value="Culture">Culture</option>
          <option value="Art">Art</option>
          <option value="Sports">Sports</option>
          <option value="Music">Music</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={styles.input}
        />

        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={styles.input}
        />

        <input
          type="number"
          placeholder="Number of seats"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          className={styles.input}
        />

        <textarea
          placeholder="Enter event description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
        />

        <button
          className={styles.btn}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Event'}
        </button>

      </div>
    </div>
  )
}


export default CreateEvent