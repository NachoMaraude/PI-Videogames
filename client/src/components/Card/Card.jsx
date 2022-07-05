import React from "react";
import equis from "../../Images/EQUIS.jpg";
import styles from "./Card.module.css";

export default function Card({ name, image, genres }) {
  return (
    <div className={styles.cards}>
      <h1>{name}</h1>
      <img
        src={image ? image : equis}
        className={styles.img}
        alt={"Image not found"}
      />
      <h3>{genres.length > 1 ? genres.join(" - ") : genres}</h3>
    </div>
  );
}
