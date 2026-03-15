import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching...");
    onSearch(query);
  };

  const handleReset = () => {
    setQuery("");
  };

  return (
    <div>
      <div> {/** This will hold the search bar portion */}
        <form onSubmit={handleSubmit}>
          <input
            type='search'
            placeholder='Search for a subtopic...'
            className='search-input'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button 
            type='reset'
            className='reset-btn'
            onClick={handleReset}
          >
            Clear
          </button>

          <button 
            type='submit' 
            className='search-btn'
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;