import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({
    videogamesPerPage,
    allVideogames,
    pagination,
    currentPage,
}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <div className={styles.pag}>
                {pageNumbers &&
                    pageNumbers.map((e) =>
                        e !== currentPage ? (
                            <div key={e}>
                                <button
                                    onClick={() => pagination(e)}
                                    className={styles.buttons}
                                >
                                    {e}
                                </button>
                            </div>
                        ) : (
                            <div key={e}>
                                <button
                                    onClick={() => pagination(e)}
                                    className={styles.current}
                                >
                                    {e}
                                </button>
                            </div>
                        )
                    )}
            </div>
        </nav>
    );
};

export default Pagination;
