import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  getAscendantDescendantFilter,
  getRatingFilter,
  getGenresFilter,
  getGenres,
  getPlatformsFilter,
  getPlatforms,
  getDbApiFilter,
} from "../../redux/actions";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import Card from "../Card/Card";
import styles from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage] = useState(15);
  const indexLast = currentPage * videogamesPerPage;
  const indexFirst = indexLast - videogamesPerPage;
  const allPages = allVideogames.slice(indexFirst, indexLast);
  const [order, setOrder] = useState("");

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  const pagination = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  function handleRefresh(e) {
    e.preventDefault();
    dispatch(getVideogames(e.target.value));
  }

  function handleAscDes(e) {
    e.preventDefault();
    dispatch(getAscendantDescendantFilter(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  function handleRating(e) {
    e.preventDefault();
    dispatch(getRatingFilter(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  function handleGenres(e) {
    e.preventDefault();
    dispatch(getGenresFilter(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  function handlePlatforms(e) {
    e.preventDefault();
    dispatch(getPlatformsFilter(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  function handleDbApi(e) {
    e.preventDefault();
    dispatch(getDbApiFilter(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  return (
    <div className={styles.background}>
      <div>
        <h1>HENRY VIDEOGAMES PI</h1>
      </div>

      <div>
        <div className={styles.create}>
          <Link to="/CreateVideogame" className={styles.link}>
            <h3>Create Videogame</h3>
          </Link>
        </div>
        <div className={styles.filters}>
          <div className={styles.filter}>
            <h4>Alphabetical Order:</h4>
            <select onChange={(e) => handleAscDes(e)} className={styles.select}>
              <option value="Default">Default</option>
              <option value="Ascendant">A - Z</option>
              <option value="Descendant">Z - A</option>
            </select>
          </div>
          <div className={styles.filter}>
            <h4>Rating Order:</h4>
            <select onChange={(e) => handleRating(e)} className={styles.select}>
              <option value="Default">Default</option>
              <option value="Ascendant">Ascendant</option>
              <option value="Descendant">Descendant</option>
            </select>
          </div>
          <div className={styles.filter}>
            <h4>Source:</h4>
            <select onChange={(e) => handleDbApi(e)} className={styles.select}>
              <option value="All">All</option>
              <option value="Api">Api</option>
              <option value="DataBase">Database</option>
            </select>
          </div>
          <div className={styles.filter}>
            <h4>Genres:</h4>
            <select onChange={(e) => handleGenres(e)} className={styles.select}>
              <option value="all">All</option>
              {genres?.map((e) => {
                return (
                  <option key={e} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.filter}>
            <h4>Platforms:</h4>
            <select
              onChange={(e) => handlePlatforms(e)}
              className={styles.select}
            >
              <option value="all">All</option>
              {platforms?.map((e) => {
                return <option value={e}>{e}</option>;
              })}
            </select>
          </div>
        </div>
        <Pagination
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          pagination={pagination}
        />
        <div>
          <button onClick={(e) => handleRefresh(e)} className={styles.select}>
            Refresh
          </button>
        </div>

        <Search />

        <div className={styles.videogames}>
          {allPages?.map((e) => (
            <Link to={"/home/" + e.id} key={e.id} className={styles.link}>
              <div key={e.id}>
                <Card
                  name={e.name}
                  image={e.image}
                  genres={
                    isNaN(e.id) ? e.genres.map((el) => el.name) : e.genres
                  }
                  key={e.id}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
