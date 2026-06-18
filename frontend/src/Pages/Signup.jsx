import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Signup.module.css'
import axios from '../api/axios'
import { useAuth } from '../context/AuthContext'

const Signup = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [role, setRole] = useState('student')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!name || !email || !password || !confirmPass) {
      setError('Please fill in all fields')
      return
    }

    if (password !== confirmPass) {
      setError('Passwords do not match')
      return
    }

    try{
      setLoading(true)
      const response = await axios.post('/auth/signup', {
        name, email, password, role
      })

      
      login(response.data.user, response.data.token)

     
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>

        <h3 className={styles.title}>Sign up</h3>

        {error && <p className={styles.error}>{error}</p>}

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          className={styles.input}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={styles.input}
        >
          <option value="student">Student</option>
          <option value="organizer">Organizer</option>
          <option value="admin">Admin</option>
        </select>

        <button
          className={styles.btn}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Sign up'}
        </button>

        <p className={styles.loginText}>
          Already have an account?{' '}
          <span onClick={() => navigate('/login')}>Log in</span>
        </p>

      </div>
    </div>
  )
}

export default Signup