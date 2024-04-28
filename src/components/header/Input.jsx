import { forwardRef } from "react";

import TitleSearch from "./TitleSearch";

const Input = forwardRef(function ({ onSearch, onSelectChange }, ref) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <TitleSearch onSearch={onSearch} ref={ref} />
      <select
        className="min-w-50 max-md:w-1/2 w-1/3 text-center bg-slate-100 dark:bg-slate-300 rounded-sm p-[2px]"
        defaultValue="rating"
        onChange={(e) => onSelectChange(e.target.value)}
      >
        <option value="rating">Sort by rating</option>
        <option value="year">Sort by latest</option>
      </select>
    </div>
  );
});

export default Input;
