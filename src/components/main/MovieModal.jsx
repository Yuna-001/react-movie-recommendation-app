import { useState, useEffect, useRef, useContext } from "react";
import { createPortal } from "react-dom";
import { MoviesContext } from "../store/movie-context";

export default function MovieModal({ index, open, onClose }) {
  const [movie, setMovie] = useState([]);
  const dialog = useRef();
  const { id, title, coverImg } =
    useContext(MoviesContext).movies.showingdMovies[index];

  const year = movie.year ? <span>year : {movie.year} </span> : null;
  const runtime = movie.runtime ? (
    <span>runtime : {movie.runtime} minutes</span>
  ) : null;
  const rating = movie.rating ? <span>rating : {movie.rating}</span> : null;
  const like = movie.like_count ? <span>like : {movie.like_count}</span> : null;
  let closeButton = null;

  const getDetails = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();

    setMovie(json.data.movie);
  };

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  if (
    window.innerWidth < 768 ||
    (movie.description_full && movie.description_full.length > 800)
  ) {
    closeButton = (
      <form method="dialog" className="text-right">
        <button className="bg-slate-600 text-slate-100 outline-none px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-slate-50 duration-100 dark:bg-slate-200 dark:text-slate-700">
          Close
        </button>
      </form>
    );
  }

  return createPortal(
    <dialog
      ref={dialog}
      className="w-[85%] bg-slate-50 p-6 rounded-xl shadow-2xl max-md:w-[90%] max-md:pt-2 dark:bg-slate-900 dark:text-slate-50"
      onClose={onClose}
    >
      <form method="dialog" className="text-right">
        <button className="text-3xl md:font-semibold text-slate-400 px-2 outline-none">
          X
        </button>
      </form>
      <section className="mb-4 mx-4 flex md:flex-row flex-col justify-between gap-8 max-md:mx-3">
        <img
          src={movie.large_cover_image ?? coverImg}
          className="md:w-[25%] w-[100%] object-contain  max-md:mt-3"
        ></img>
        <div className="mx-auto flex flex-col gap-4 text-center">
          <h1 className="font-bold text-3xl mt-3 mb-6">
            {movie.title ?? title}
          </h1>
          <div className="mx-auto">
            <p className="flex md:flex-row flex-col md:gap-5">
              {year}
              {runtime}
              {rating}
              {like}
            </p>
            <p>{movie.genres && "genre : " + movie.genres.join(", ")}</p>
          </div>
          <p className="m-auto py-3">{movie.description_full}</p>
        </div>
      </section>
      {closeButton}
    </dialog>,
    document.querySelector("#modal")
  );
}
