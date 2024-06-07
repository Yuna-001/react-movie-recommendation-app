import { useContext, useRef } from "react";

import Input from "./Input";
import { MoviesContext } from "../../store/movie-context";

export default function Header() {
  const input = useRef();
  const { searchTitle, changeSorting } = useContext(MoviesContext);

  function handleTitleClick() {
    input.current.value = "";
    searchTitle("");
  }

  function handleSort(str) {
    input.current.value = "";
    changeSorting(str);
  }

  return (
    <header className="flex flex-col gap-10 mt-10 max-sm:mt-12">
      <h1
        onClick={handleTitleClick}
        className="font-bold text-5xl dark:text-slate-100 cursor-pointer max-md:text-4xl"
      >
        Movie Recommendation App
      </h1>
      <Input
        onSearch={() => searchTitle(input.current.value)}
        onSelectChange={handleSort}
        ref={input}
      />
    </header>
  );
}
