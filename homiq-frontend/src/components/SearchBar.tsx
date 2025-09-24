import { useState } from "react";
import { SearchIcon } from "../assets/icons";
import InputField from "./InputField";
import type { SearchBarProps } from "../models/components";


const SearchBar: React.FC<SearchBarProps> = ({  search, setSearch }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      
      <button
        onClick={() => setOpen(!open)}
        className="p-2  text-white  transition cursor-pointer "
      >
        <SearchIcon />
      </button>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          open ? "w-64 opacity-100" : "w-0 opacity-0"
        }`}
      >
        <InputField name="search" value={search} onChange={(e) => setSearch(e.target.value)}  />
      </div>
    </div>
  );
}

export default SearchBar;