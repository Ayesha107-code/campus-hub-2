import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import axios from '../api/axios'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    

    try {
      setLoading(true)
      const response = await axios.post('/auth/login', { email, password })

      // save user and token in AuthContext
      login(response.data.user, response.data.token)

      // redirect to home page
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>

        <h3 className={styles.title}>Login</h3>

        {/* show error if any */}
        {error && <p className={styles.error}>{error}</p>}

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

        <button
          className={styles.btn}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        <p className={styles.signupText}>
          Don't have an account?{' '}
          <span onClick={() => navigate('/signup')}>Sign up</span>
        </p>

      </div>
    </div>
  )
}

export default Login