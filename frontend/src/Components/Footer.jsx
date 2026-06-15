import React from "react";
import styles from "./Footer.module.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.brand}>
            <h4 className={styles.logo}>🎓 Campus Hub</h4>
            <p className={styles.tagline}>Your Campus. Your Events</p>
          </div>
          <div className={styles.pages}>
            <span onClick={() => navigate("/")}>Home</span>
            <span onClick={() => navigate("/events")}>Events</span>
            <span onClick={() => navigate("/login")}>Log in</span>
          </div>
        </div>
        <hr />
        <p className={styles.copyright}>
          © 2026 Campus Hub. All rights reserved.
        </p>
      </footer>
    </>
  );
};


export default Footer;
