import { useEffect, useContext } from "react";

import Loading from "./components/Loading";
import Header from "./components/header/Header";
import Movie from "./components/main/Movie";
import ThemeButton from "./components/ThemeButton";
import { MoviesContext } from "./store/movie-context";

function App() {
  const { movies, sorting, initializeMovies } = useContext(MoviesContext);

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=${sorting}`
      )
    ).json();

    initializeMovies({
      originalMovies: json.data.movies,
      showingdMovies: [...json.data.movies],
    });
  };

  useEffect(() => {
    getMovies();
  }, [sorting]);

  return (
    <div className="min-h-screen text-center px-8 py-10 lg:py-5 bg-white dark:bg-black relative">
      <ThemeButton />
      <Header />
      {movies.originalMovies.length > 0 ? (
        <main className="my-24 max-lg:my-20 mx-0 md:mx-10 grid lg:grid-cols-2 gap-16 grid-cols-1">
          {movies.showingdMovies.map((movie, index) => (
            <Movie key={movie.id} index={index} />
          ))}
        </main>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
