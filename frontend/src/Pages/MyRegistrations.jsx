import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './MyRegistrations.module.css'
import axios from '../api/axios'
import { useAuth } from '../context/AuthContext'


const MyRegistrations = () => {
  const navigate = useNavigate()
  const { token } = useAuth()
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        console.log('Token:', token)
        const response = await axios.get('/registrations/my', {
          headers: { Authorization: `Bearer ${token}` }
        })
        console.log('Response:', response.data)
        setRegistrations(response.data)
        setLoading(false)
      } catch (err) {
        console.log('Error:', err.response?.data)
        setError(err.response?.data?.message || 'Failed to fetch')
        setLoading(false)
      }
    }
    fetchRegistrations()
  }, [])

  const handleCancel = async (id) => {
    try {
      await axios.delete(`/registrations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setRegistrations(registrations.filter(r => r._id !== id))
      alert('Registration cancelled!')
    } catch (err) {
      alert('Failed to cancel registration')
    }
  }

 if (loading) {
  return (
    <div className={styles.container}>
      <p className={styles.loading}>Loading your registrations...</p>
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

      <h2 className={styles.heading}>My Registrations</h2>

      {registrations.length === 0 && (
        <p className={styles.empty}>You have not registered for any events yet.</p>
      )}

      <div className={styles.list}>
        {registrations.map(reg => (
          <div className={styles.card} key={reg._id}>
            <span className={styles.emoji}>{reg.event?.emoji}</span>
            <div className={styles.info}>
              <h3 className={styles.title}>{reg.event?.title}</h3>
              <p className={styles.meta}>{reg.event?.category} · 📅 {reg.event?.date}</p>
            </div>
            <div className={styles.actions}>
              <button
                className={styles.viewBtn}
                onClick={() => navigate(`/events/${reg.event?._id}`)}
              >
                View
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => handleCancel(reg._id)}
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default MyRegistrations