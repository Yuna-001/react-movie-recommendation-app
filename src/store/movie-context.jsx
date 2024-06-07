import { createContext, useReducer } from "react";

export const MoviesContext = createContext({
  movies: {
    originalMovies: [],
    showingdMovies: [],
  },
  sorting: "rating",
  changeSorting: () => {},
  searchTitle: () => {},
  initializeMovies: () => {},
});

function moviesReducer(state, action) {
  if (action.type === "SEARCH_TITLE") {
    const str = action.payload.trim();
    if (str === "") {
      return {
        ...state,
        showingdMovies: [...state.originalMovies],
      };
    }

    const filteredMovies = state.originalMovies.filter(({ title }) =>
      new RegExp(str, "i").test(title)
    );

    return {
      ...state,
      showingdMovies: filteredMovies,
    };
  } else if (action.type === "INIT") {
    return { ...state, ...action.payload };
  } else if (action.type === "SORT") {
    return {
      ...state,
      sorting: action.payload,
    };
  }

  return state;
}

export default function MoviesContextProvider({ children }) {
  const [moviesState, moviesDispatch] = useReducer(moviesReducer, {
    originalMovies: [],
    showingdMovies: [],
    sorting: "rating",
  });

  function handleSearchTitle(str) {
    moviesDispatch({
      type: "SEARCH_TITLE",
      payload: str,
    });
  }

  function handleInitializeMovies(newMovies) {
    moviesDispatch({
      type: "INIT",
      payload: newMovies,
    });
  }

  function handleChangeSorting(newSorting) {
    moviesDispatch({
      type: "SORT",
      payload: newSorting,
    });
  }

  const ctxValue = {
    movies: {
      originalMovies: moviesState.originalMovies,
      showingdMovies: moviesState.showingdMovies,
    },
    sorting: moviesState.sorting,
    changeSorting: handleChangeSorting,
    searchTitle: handleSearchTitle,
    initializeMovies: handleInitializeMovies,
  };

  return (
    <MoviesContext.Provider value={ctxValue}>{children}</MoviesContext.Provider>
  );
}
