import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Event.module.css'
import axios from '../api/axios'


const categories = ['All', 'Tech', 'Music', 'Sports', 'Art', 'Career', 'Culture']

const Events = () => {
  
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // fetch events from backend when page loads
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/events')
        setEvents(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to load events')
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  // filter logic
  const filtered = events.filter((event) => {
    const matchSearch = event.title.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || event.category === category
    return matchSearch && matchCategory
  })

  const categoryImages = {
  Tech: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
  Music: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
  Sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80',
  Art: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&q=80',
  Career: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&q=80',
  Culture: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400&q=80',
}

 if (loading) {
  return (
    <div className={styles.container}>
      <p className={styles.loading}>Loading your events...</p>
    </div>
  )
}

if (error) {
  return (
    <div className={styles.container}>
      <p className={styles.error}>{error}</p>
    </div>
  )
}

  return (

    <div className={styles.container}>

      <h3 className={styles.heading}>All Events</h3>

      {events.length === 0 && (
              <p className={styles.empty}>No events.</p>
            )}

      <input
        type="text"
        placeholder="Search events"
        value={search}
        className={styles.searchInput}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={styles.categories}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={category === cat ? styles.btnActive : styles.btnFilter}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.eventsGrid}>
        {filtered.map(event => (
          <div
            className={styles.eventCard}
            key={event._id}
            onClick={() => navigate(`/events/${event._id}`)}
          >
            <div className={styles.cardImage}>
  <img
    src={categoryImages[event.category] || categoryImages['Tech']}
    alt={event.title}
  />
</div>
            <div className={styles.cardBody}>
              <span className={styles.cardCategory}>{event.category}</span>
              <h3 className={styles.cardTitle}>{event.title}</h3>
              <p className={styles.cardDate}>📅 {event.date}</p>
              <p className={styles.cardLocation}>📍 {event.location}</p>
              <button className={styles.cardBtn}>View Details →</button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
  <p className={styles.noResults}>
    {search
      ? `No events found for "${search}"`
      : `No events found in "${category}" category`
    }
  </p>
)}

    </div>
  )
}

export default Events