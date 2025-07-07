import { useState } from "react";
import {AiOutlineSearch} from "react-icons/ai"

const Searchbar = ({ query, setQuery }) => {
  const [temp, setTemp] = useState(query);

  return (
    <div className="mb-4 flex flex-direction: column">
      <div className="flex items-center w-full md:w-1/2">
        <input
          type="text"
          placeholder="Search tickets..."
          value={temp}
          onChange={(e) => {
            setTemp(e.target.value);
            if(!e.target.value) setQuery("");
          }}
          className="flex-grow px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button className="flex items-center justify-center px-4 bg-blue-500 text-white rounded-r cursor-pointer"
      onClick={() => setQuery(temp)}
      >
        <AiOutlineSearch size={20}/>
      </button>
    </div>
  );
}

export default Searchbar;