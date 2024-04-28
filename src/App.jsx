import { useState, useEffect } from "react";

import Loading from "./components/Loading";
import Header from "./components/header/Header";
import Movie from "./components/main/Movie";
import ThemeButton from "./components/ThemeButton";

function App() {
  const [sorting, setSorting] = useState("rating");
  const [movies, setMovies] = useState({
    originalMovies: [],
    showingdMovies: [],
  });

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=${sorting}`
      )
    ).json();

    setMovies({
      originalMovies: json.data.movies,
      showingdMovies: [...json.data.movies],
    });
  };

  useEffect(() => {
    getMovies();
  }, [sorting]);

  function handleSearchTitle(str) {
    setMovies((prevMovies) => {
      if (str.trim() === "") {
        return {
          ...prevMovies,
          showingdMovies: [...prevMovies.originalMovies],
        };
      }

      const filteredMovies = prevMovies.originalMovies.filter(({ title }) =>
        new RegExp(str, "i").test(title)
      );

      return {
        ...prevMovies,
        showingdMovies: filteredMovies,
      };
    });
  }

  function handleSortMovies(value) {
    setSorting(value);
  }

  return (
    <>
      <div className="min-h-screen text-center px-8 py-10 lg:py-5 bg-white dark:bg-black relative">
        <ThemeButton />
        <Header onSearchTitle={handleSearchTitle} onSort={handleSortMovies} />
        {movies.originalMovies.length > 0 ? (
          <main className="my-24 max-lg:my-20 mx-0 md:mx-10 grid lg:grid-cols-2 gap-16 grid-cols-1">
            {movies.showingdMovies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                coverImg={movie.medium_cover_image}
                rating={movie.rating}
                year={movie.year}
                genres={movie.genres}
                summary={movie.summary}
              />
            ))}
          </main>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}

export default App;
