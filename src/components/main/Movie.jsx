import { useState } from "react";

import MovieModal from "./MovieModal";

export default function Movie({
  id,
  title,
  coverImg,
  rating,
  year,
  genres,
  summary,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleClick() {
    setModalIsOpen(true);
  }

  function handleClose() {
    setModalIsOpen(false);
  }

  return (
    <>
      {modalIsOpen && (
        <MovieModal
          id={id}
          title={title}
          image={coverImg}
          open={modalIsOpen}
          onClose={handleClose}
        />
      )}
      <section
        className="w-[90%] md:min-h-60 mx-auto flex flex-col md:flex-row gap-4 bg-slate-200 dark:bg-slate-700 dark:text-slate-300 p-6 max-md:py-10 rounded-sm shadow-lg hover:scale-105 cursor-pointer duration-200"
        onClick={handleClick}
      >
        <img
          src={coverImg}
          alt={title}
          className="max-md:w-[80%] max-md:mx-auto md:max-h-72 md:w-[30%] object-contain"
        ></img>
        <div className="flex gap-2 flex-col m-auto">
          <h2 className="font-semibold text-xl dark:text-white">{title}</h2>
          <p>
            {genres.length > 3
              ? genres.slice(0, 3).join(", ") + "..."
              : genres.join(", ")}
          </p>
          <p>year : {year}</p>
          <p>rating : {rating}</p>
          <p>{summary.length > 90 ? summary.slice(0, 90) + "..." : summary}</p>
        </div>
      </section>
    </>
  );
}
