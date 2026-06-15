import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './EditEvent.module.css'
import axios from '../api/axios'
import { useAuth } from '../context/AuthContext'


const EditEvent = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { token } = useAuth()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Tech')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [seats, setSeats] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // fetch event data and pre fill form
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`/events/${id}`)
        const event = response.data
        setTitle(event.title)
        setCategory(event.category)
        setDate(event.date)
        setLocation(event.location)
        setSeats(event.seats)
        setDescription(event.description)
        setLoading(false)
      } catch (err) {
        setError('Event not found')
        setLoading(false)
      }
    }
    fetchEvent()
  }, [id])

  const handleSubmit = async () => {
    if (!title || !date || !location || !seats || !description) {
      alert('Please fill in all fields')
      return
    }

    try {
      await axios.put(`/events/${id}`,
        { title, category, date, location, seats: Number(seats), description },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert('Event updated successfully!')
      navigate('/dashboard')
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update event')
    }
  }

  if (loading) {
    return <div className={styles.container}><p>Loading...</p></div>
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p>Event not found</p>
        <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h3 className={styles.title}>Edit Event</h3>

        <input
          type="text"
          placeholder="Enter title"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className={styles.input}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
          className={styles.input}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter no. of seats"
          className={styles.input}
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter location"
          className={styles.input}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <textarea
          placeholder="Enter event description"
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className={styles.btn} onClick={handleSubmit}>
          Save Changes
        </button>

      </div>
    </div>
  )
}

export default EditEvent