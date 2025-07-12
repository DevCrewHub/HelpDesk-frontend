import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Searchbar = ({ query, setQuery, searching }) => {
  const [temp, setTemp] = useState(query);

  const handleSearch = () => {
    setQuery(temp.trim());
  };

  return (
    <div className="mb-4 flex flex-col">
      <div className="flex items-center w-full md:w-1/2">
        <input
          type="text"
          placeholder="Search tickets..."
          value={temp}
          onChange={(e) => {
            setTemp(e.target.value);
            if (e.target.value === "") setQuery(""); // auto clear
          }}
          className="flex-grow px-4 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 disabled:opacity-50"
          disabled={searching}
        >
          <AiOutlineSearch size={20} />
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
