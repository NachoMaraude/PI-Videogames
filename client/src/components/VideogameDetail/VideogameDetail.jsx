import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clean, getVideogamesDetail } from "../../redux/actions";
import equis from "../../Images/EQUIS.jpg";
import styles from "./VideogameDetail.module.css";

export default function VideogameDetail() {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    dispatch(getVideogamesDetail(id));
    dispatch(clean());
  }, [dispatch, id]);

  const videogameDetail = useSelector((state) => state.videogameDetail);

  return (
    <div className={styles.detail}>
      {videogameDetail.name ? (
        <div>
          <div>
            <button className={styles.back}>
              <Link to="/home" className={styles.link}>
                {" "}
                Back to view all videogames
              </Link>
            </button>
          </div>
          <div>
            <h3>Name: {videogameDetail.name}</h3>
            <img
              src={videogameDetail.image ? videogameDetail.image : equis}
              className={styles.image}
            ></img>
            <h3>
              Genres:{" "}
              {videogameDetail.genres.length > 1
                ? videogameDetail.genres.join(" - ")
                : videogameDetail.genres}
            </h3>
            <h3>Description:</h3>
            <h4
              dangerouslySetInnerHTML={{
                __html: `${videogameDetail.description}`,
              }}
            />
            <h3>Release Date: {videogameDetail.released}</h3>
            <h3>Rating: {videogameDetail.rating}</h3>
            <h3>
              Platforms:{" "}
              {videogameDetail.platforms.length > 1
                ? videogameDetail.platforms.join(" - ")
                : videogameDetail.platforms}
            </h3>
          </div>
        </div>
      ) : (
        <h5>Loading...</h5>
      )}
    </div>
  );
}
