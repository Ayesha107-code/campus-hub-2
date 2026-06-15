import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Dashboard.module.css'
import axios from '../api/axios'
import { useAuth } from '../context/AuthContext'


const Dashboard = () => {
  const navigate = useNavigate()
  const { token } = useAuth()
  const [eventList, setEventList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/events')
        setEventList(response.data)
        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setEventList(eventList.filter(event => event._id !== id))
      alert('Event deleted successfully!')
    } catch (err) {
      alert('Failed to delete event')
    }
  }

  if (loading) {
    return <div className={styles.container}><p>Loading...</p></div>
  }

  return (
    <div className={styles.container}>

      <h3 className={styles.title}>Admin Dashboard</h3>

      <div className={styles.stats}>
        Total Events: {eventList.length}
      </div>

      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Seats</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {eventList.map(event => (
              <tr key={event._id}>
                <td>{event.title}</td>
                <td>{event.category}</td>
                <td>{event.date}</td>
                <td>{event.seats}</td>
                <td>
                  <button
                    className={styles.btn}
                    onClick={() => navigate(`/events/${event._id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.btn}
                    onClick={() => handleDelete(event._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Dashboard