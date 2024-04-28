import { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const TitleSearch = forwardRef(function ({ onSearch }, ref) {
  function handleEnter(e) {
    if (e.key === "Enter") {
      onSearch();
    }
  }

  return (
    <div className="flex gap-2 max-md:w-1/2 w-1/3 min-w-36">
      <input
        ref={ref}
        type="text"
        className="w-[100%] text-md bg-slate-100 dark:bg-slate-500 dark:text-slate-100 py-1 px-2 my-1 rounded-sm"
        placeholder="Title"
        onKeyDown={handleEnter}
      />
      <button onClick={onSearch}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size="lg"
          className="dark:text-slate-200"
        />
      </button>
    </div>
  );
});

export default TitleSearch;
