import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from '../api/axios'
import { useAuth } from '../context/AuthContext'
import styles from './EventDetails.module.css'


const EventDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { token } = useAuth()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const categoryImages = {
  Tech: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
  Music: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
  Sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80',
  Art: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&q=80',
  Career: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&q=80',
  Culture: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400&q=80',
}

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`/events/${id}`)
        setEvent(response.data)
        setLoading(false)
      } catch (err) {
        setError('Event not found')
        setLoading(false)
      }
    }
    fetchEvent()
  }, [id])

  const handleRegister = async () => {
    if (!token) {
      alert('Please login first!')
      navigate('/login')
      return
    }
    try {
      await axios.post('/registrations',
        { eventId: event._id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert(`Successfully registered for ${event.title}!`)
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed')
    }
  }

  if (loading) {
    return <div className={styles.container}><p>Loading...</p></div>
  }

  if (error) {
    return (
      <div className={styles.notFound}>
        <p>Event not found</p>
        <button onClick={() => navigate('/events')}>Back to Events</button>
      </div>
    )
  }

  return (
    <div className={styles.container}>

      <button className={styles.backBtn} onClick={() => navigate('/events')}>
        ← Back to Events
      </button>

      <div className={styles.layout}>

        <div className={styles.main}>

          <div className={styles.banner}>
           <img src={categoryImages[event.category] || categoryImages['Tech']}
            alt={event.title} />
         </div>

          <span className={styles.category}>{event.category}</span>

          <h1 className={styles.title}>{event.title}</h1>

          <div className={styles.metaRow}>
            <div className={styles.metaItem}>Date: {event.date}</div>
            <div className={styles.metaItem}>Location: {event.location}</div>
            <div className={styles.metaItem}>Seats: {event.seats} available</div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>About this event</h3>
            <p className={styles.description}>{event.description}</p>
          </div>

        </div>

        <div className={styles.sidebar}>
          <div className={styles.registerBox}>
            <h3 className={styles.registerTitle}>Join this event</h3>
            <div className={styles.registerInfo}>
              <p className={styles.registerDate}>Date: {event.date}</p>
              <p className={styles.registerLocation}>Location: {event.location}</p>
              <p className={styles.registerSeats}>Seats: {event.seats} available</p>
            </div>
            <button className={styles.registerBtn} onClick={handleRegister}>
              Register Now
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default EventDetails