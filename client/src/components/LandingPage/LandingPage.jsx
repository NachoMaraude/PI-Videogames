import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.fondo}>
      <h1 className={styles.welcome}>Welcome</h1>
      <Link to="/home" className={styles.link}>
        <button className={styles.main_div}>Enter</button>
      </Link>
    </div>
  );
}
