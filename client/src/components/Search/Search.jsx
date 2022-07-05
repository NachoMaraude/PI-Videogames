import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../../redux/actions";
import styles from "./Search.module.css";

export default function Search() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleButtonChange(e) {
    e.preventDefault();
    dispatch(getVideogamesByName(name));
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search Videogames"
        onChange={(e) => handleInputChange(e)}
        className={styles.select}
      />
      <button
        type="submit"
        onClick={(e) => handleButtonChange(e)}
        className={styles.select}
      >
        Search
      </button>
    </div>
  );
}
