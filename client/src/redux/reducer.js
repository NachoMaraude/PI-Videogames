import {
  GET_VIDEOGAMES,
  GET_VIDEOGAMES_BY_NAME,
  GET_ASCENDANT_DESCENDANT_FILTER,
  CLEAN,
  GET_RATING_FILTER,
  GET_VIDEOGAMES_DETAIL,
  GET_GENRES,
  GET_GENRES_FILTER,
  GET_PLATFORMS,
  GET_PLATFORMS_FILTER,
  GET_DB_API_FILTER,
} from "./actions";

const initialState = {
  videogames: [],
  videogamesCopy: [],
  genres: [],
  videogameDetail: {},
  platforms: [],
  dbFilter: [],
  apiFilter: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        videogamesCopy: action.payload,
        dbFilter: action.payload.filter((e) => e.createdInDb),
        apiFilter: action.payload.filter((e) => !e.createdInDb),
      };
    case GET_VIDEOGAMES_BY_NAME:
      return {
        ...state,
        videogames: action.payload,
      };
    case GET_ASCENDANT_DESCENDANT_FILTER:
      const e = state.videogamesCopy;
      let ascendantDescendant =
        action.payload === "Default"
          ? e
          : action.payload === "Ascendant"
          ? state.videogames.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: ascendantDescendant,
      };
    case GET_RATING_FILTER:
      const a = state.videogamesCopy;
      let ratingFilter =
        action.payload === "Default"
          ? a
          : action.payload === "Ascendant"
          ? state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return 1;
              }
              if (a.rating < b.rating) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1;
              }
              if (a.rating < b.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: ratingFilter,
      };
    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_GENRES_FILTER:
      const g = state.videogamesCopy;
      let v = null;
      if (action.payload === "all") {
        v = g;
        return {
          ...state,
          videogames: g,
        };
      } else v = g.filter((e) => e.genres?.includes(action.payload));
      return {
        ...state,
        videogames: v,
      };
    case GET_PLATFORMS_FILTER:
      const p = state.videogamesCopy;
      let pl = null;
      if (action.payload === "all") {
        pl = p;
        return {
          ...state,
          videogames: p,
        };
      } else pl = p.filter((p) => p.platforms?.includes(action.payload));
      return {
        ...state,
        videogames: pl,
      };
    case GET_DB_API_FILTER:
      let db = state.dbFilter;
      let api = state.apiFilter;
      if (action.payload === "DataBase") {
        return {
          ...state,
          videogames: db,
        };
      }
      if (action.payload === "Api") {
        return {
          ...state,
          videogames: api,
        };
      }
      if (action.payload === "All") {
        return {
          ...state,
          videogames: api.concat(db),
        };
      }
    case GET_VIDEOGAMES_DETAIL:
      return {
        ...state,
        videogameDetail: action.payload,
      };
    case CLEAN:
      return {
        ...state,
        videogameDetail: {},
      };
    default:
      return state;
  }
};

export default rootReducer;
