import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinkClass = ({ isActive }) =>
    isActive ? `${styles.active} ${styles.navLink}` : styles.navLink

  const closeMenu = () => setMenuOpen(false)

  let userAuth
  if (user) {
    userAuth = (
      <>
        <NavLink to="/notifications" className={styles.bellLink}>🔔</NavLink>
        <div className={styles.avatar} onClick={logout}>{user.name[0]}</div>
      </>
    )
  } else {
    userAuth = (
      <>
        <NavLink to="/login" className={styles.btnOutline} onClick={closeMenu}>Log in</NavLink>
        <NavLink to="/signup" className={styles.btnPrimary} onClick={closeMenu}>Sign up</NavLink>
      </>
    )
  }

  let extraLinks
if (user && user.role === 'admin') {
  extraLinks = (
    <>
      <NavLink to="/my-registrations" className={navLinkClass} onClick={closeMenu}>My Registrations</NavLink>
      <NavLink to="/dashboard" className={navLinkClass} onClick={closeMenu}>Dashboard</NavLink>
      <NavLink to="/createEvent" className={navLinkClass} onClick={closeMenu}>Create Event</NavLink>
    </>
  )
} else if (user && user.role === 'organizer') {
  extraLinks = (
    <>
      <NavLink to="/my-registrations" className={navLinkClass} onClick={closeMenu}>My Registrations</NavLink>
      <NavLink to="/createEvent" className={navLinkClass} onClick={closeMenu}>Create Event</NavLink>
    </>
  )
} else if (user) {
  extraLinks = (
    <NavLink to="/my-registrations" className={navLinkClass} onClick={closeMenu}>My Registrations</NavLink>
  )
} else {
  extraLinks = null
}

  let hamburgerIcon
  if (menuOpen) {
    hamburgerIcon = '✕'
  } else {
    hamburgerIcon = '☰'
  }

  let mobileMenu
  if (menuOpen) {
    mobileMenu = (
      <div className={styles.mobileMenu}>
        <NavLink to="/" end className={styles.navLink} onClick={closeMenu}>Home</NavLink>
        <NavLink to="/events" className={styles.navLink} onClick={closeMenu}>Events</NavLink>
        {extraLinks}
        <div className={styles.mobileDivider}></div>
        {userAuth}
      </div>
    )
  } else {
    mobileMenu = null
  }

  return (
    <>
      <nav className={styles.navbar}>
        <NavLink to="/" className={styles.logo}>🎓 Campus Hub</NavLink>

        <div className={styles.navLinks}>
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/events" className={navLinkClass}>Events</NavLink>
          {extraLinks}
        </div>

        <div className={styles.navAuth}>{userAuth}</div>

        <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          {hamburgerIcon}
        </button>
      </nav>
      {mobileMenu}
    </>
  )
}


export default Navbar