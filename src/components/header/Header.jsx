import { useRef } from "react";

import Input from "./Input";

export default function Header({ onSearchTitle, onSort }) {
  const searchTitle = useRef();

  function handleTitleClick() {
    searchTitle.current.value = "";
    onSearchTitle("");
  }

  function handleSort(str) {
    searchTitle.current.value = "";
    onSort(str);
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
        onSearch={() => onSearchTitle(searchTitle.current.value)}
        onSelectChange={handleSort}
        ref={searchTitle}
      />
    </header>
  );
}
