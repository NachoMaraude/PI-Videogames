import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ videogamesPerPage, allVideogames, pagination }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.pag}>
        {pageNumbers &&
          pageNumbers.map((e) => (
            <div key={e}>
              <button onClick={() => pagination(e)} className={styles.buttons}>
                {e}
              </button>
            </div>
          ))}
      </ul>
    </nav>
  );
};

export default Pagination;
