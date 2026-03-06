import { curriculum } from '../components/Questions/curriculumConfig.js';
import { useState } from 'react';

const SearchBar = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSubTopic, setSelectedSubTopic] = useState('');
  const [formData, setFormData] = useState(null);
  const [tags, setTags] = useState({
    Year: "",
    Topic: "",
    SubTopic: ""
  });

  const handleFormSubmit = (submittedData) => {
    console.log("Data received in parent:", submittedData);
    setFormData(submittedData);
  }

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedTopic('');
    setSelectedSubTopic('');
  }

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
    setSelectedSubTopic('');
  }

  const handleReset = () => {
    setSelectedYear("");
    setSelectedTopic("");
    setSelectedSubTopic("");
  }


  return (
    <div>
      <div> {/** This will hold the search bar portion */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Searching...");
          }}
        >
          

          <input
            type='search'
            placeholder='Search questions...'
            className='search-input'
          />

          <button 
            type='reset'
            className='reset-btn'
            onClick={() => {handleReset()}}
          >
            Reset
          </button>

          <button type='submit' className='search-btn'>
            Search
          </button>
        </form>

        

      </div>

      {/* Results Area */}
      <div className='results-area'>
        <h2>Results</h2>
        <div className='results-box'>
          No results yet.
        </div>
      </div>
    </div>
  );
}

export default SearchBar;