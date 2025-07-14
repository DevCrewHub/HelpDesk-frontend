import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Searchbar = ({ query, setQuery, searching }) => {
  const [temp, setTemp] = useState(query);

  const handleSearch = () => {
    setQuery(temp.trim());
  };

  return (
    <div className="mb-6 flex justify-center md:justify-start">
      <div className="flex w-full max-w-lg overflow-hidden rounded-md border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-indigo-500">
        <input
          type="text"
          placeholder="Search tickets..."
          value={temp}
          onChange={(e) => {
            setTemp(e.target.value);
            if (e.target.value === "") setQuery(""); // auto clear
          }}
          className="flex-grow px-4 py-2 text-sm text-gray-700 bg-transparent placeholder-gray-400 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          disabled={searching}
          className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <AiOutlineSearch size={18} />
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
