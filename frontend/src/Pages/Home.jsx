import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'
import axios from '../api/axios'
import { useAuth } from '../context/AuthContext'


const categoryImages = {
  Tech: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
  Music: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
  Sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80',
  Art: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&q=80',
  Career: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&q=80',
  Culture: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400&q=80',
}

const Home = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/events')
        // show only first 3 events on home page
        setEvents(response.data.slice(0, 3))
        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const handleGetStarted = () => {
    if (user) {
      navigate('/createEvent')
    } else {
      navigate('/signup')
    }
  }

  return (
    <div className={styles.home}>

      
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Discover. Connect. Celebrate.</h1>
        <p className={styles.heroSub}>
          Find exciting events and make unforgettable memories on campus.
        </p>
        <div className={styles.heroButtons}>
          <button className={styles.btnPrimary} onClick={() => navigate('/events')}>
            Explore Events
          </button>
          <button className={styles.btnOutline} onClick={() => navigate('/signup')}>
            Join Campus Hub
          </button>
        </div>
      </section>

      
      <section className={styles.featured}>

        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Events</h2>
          <button className={styles.viewAll} onClick={() => navigate('/events')}>
            View all →
          </button>
        </div>

        {loading ? (
          <p className={styles.loading}>Loading events...</p>
        ) : (
          <div className={styles.eventsGrid}>
            {events.map(event => (
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
                  <button className={styles.cardBtn}>Register →</button>
                </div>
              </div>
            ))}
          </div>
        )}

      </section>

      
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Are you an organizer?</h2>
        <p className={styles.ctaSub}>Create and manage your campus events easily.</p>
        <button className={styles.ctaBtn} onClick={handleGetStarted}>
          Get Started →
        </button>
      </section>

    </div>
  )
}

export default Home
