import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME";
export const GET_ASCENDANT_DESCENDANT_FILTER =
  "GET_ASCENDANT_DESCENDANT_FILTER";
export const GET_RATING_FILTER = "GET_RATING_FILTER";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const GET_GENRES_FILTER = "GET_GENRES_FILTER";
export const GET_PLATFORMS_FILTER = "GET_PLATFORMS_FILTER";
export const GET_DB_API_FILTER = "GET_DB_API_FILTER";
export const GET_VIDEOGAMES_DETAIL = "GET_VIDEOGAMES_DETAIL";
export const CLEAN = "CLEAN";

export function getVideogames() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export function getVideogamesByName(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
      return dispatch({
        type: "GET_VIDEOGAMES_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      return alert("Videogame not found");
    }
  };
}

export function getAscendantDescendantFilter(payload) {
  return {
    type: "GET_ASCENDANT_DESCENDANT_FILTER",
    payload,
  };
}

export function getRatingFilter(payload) {
  return {
    type: "GET_RATING_FILTER",
    payload,
  };
}

export function getGenres() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/genre");
    return dispatch({
      type: "GET_GENRES",
      payload: json.data,
    });
  };
}

export function getPlatforms() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/platforms");
    return dispatch({
      type: "GET_PLATFORMS",
      payload: json.data,
    });
  };
}

export function getGenresFilter(payload) {
  return function (dispatch) {
    return dispatch({
      type: "GET_GENRES_FILTER",
      payload,
    });
  };
}

export function getPlatformsFilter(payload) {
  return function (dispatch) {
    return dispatch({
      type: "GET_PLATFORMS_FILTER",
      payload,
    });
  };
}

export function getDbApiFilter(payload) {
  return function (dispatch) {
    return dispatch({
      type: "GET_DB_API_FILTER",
      payload,
    });
  };
}

export function getVideogamesDetail(id) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/videogame/${id}`);
    return dispatch({
      type: "GET_VIDEOGAMES_DETAIL",
      payload: json.data,
    });
  };
}

export function createVideogame(payload) {
  return async function () {
    try {
      console.log(payload);
      return await axios.post("http://localhost:3001/videogame", payload);
    } catch (error) {
      return alert("Videogame cannot be created");
    }
  };
}

export function clean() {
  return {
    type: "CLEAN",
  };
}
