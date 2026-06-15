import { useState, useEffect } from 'react'
import styles from './Notifications.module.css'
import axios from '../api/axios'
import { useAuth } from '../context/AuthContext'


const Notifications = () => {
  const { token } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/notifications', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setNotifications(response.data)
        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }
    fetchNotifications()
  }, [])

  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.loading}>Loading notifications...</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <h2 className={styles.heading}>Notifications</h2>
        <span className={styles.count}>
          {notifications.filter(n => !n.read).length} unread
        </span>
      </div>

      <div className={styles.list}>
        {notifications.map((notification) => (
          <div
            className={notification.read ? styles.card : styles.cardUnread}
            key={notification.id}
          >
            <div className={styles.dot}>
              {!notification.read && <span className={styles.unreadDot}></span>}
            </div>
            <div className={styles.content}>
              <div className={styles.cardTop}>
                <h4 className={styles.title}>{notification.title}</h4>
                <span className={styles.time}>{notification.time}</span>
              </div>
              <p className={styles.message}>{notification.message}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Notifications