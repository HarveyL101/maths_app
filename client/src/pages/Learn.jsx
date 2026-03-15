import TitleBar from '../components/TitleBar.jsx';
import SearchBar from '../components/SearchBar.jsx';
import Accordion from '../components/Accordion.jsx';
import { curriculum } from '../components/Questions/curriculumConfig.js';
import { useState } from 'react';

const Learn = () => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async (params) => {
    try {
      const query = new URLSearchParams(params).toString();

      const res = await fetch(`/api/questions?${query}`);
      const data = await res.json();

      console.log(data);

      setQuestions(data);
    } catch(error) {
      console.error("Failed to fetch questions", error);
    }
    
  }

  const formatQuestions = (data) => {
    // values to be mapped 
    /**
     * Year Group q.year_group
     * Topic q.topic
     * Subtopic q.subtopic
     * Question Title q.title
     * Creator q.surname
     */
    const formattedData = data.map((q) => (
      <div key={q.question_id} className='item-container'> 
        <div>
          <p className='question-id'>Question Id: {q.question_id}</p>
        </div>
        <div className='item-body'>
          <p className='item-title'>{q.subtopic_name} by {q.creator_surname}</p>
          <button className='item-button'>▸</button>
        </div>

        <div className='item-footer'>
          <h3 className='item-year-group'>Year {q.year_group}</h3>
          <h3 className='item-topic'>{q.topic_name}</h3>
        </div>
      </div>
    ))
    
    return formattedData;
  }
  
  const buildAccordionData = (curriculum) => {
    return Object.entries(curriculum).map(([year, topics]) => ({
      title: `Year ${year}`,
      children: Object.entries(topics).map(([topic, subtopics]) => ({
        title: topic,
        children: subtopics.map((subtopic) => ({
          title: subtopic,
          year,
          topic,
          subtopic
        }))
      }))
    }));
  };

  const accordionData = buildAccordionData(curriculum);

  const handleReset = () => {
    setQuestions([]);
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <TitleBar />
      
      <div className='flex flex-1 pt-4'>
        <div className='flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-16 overflow-y-auto p-4'>
          <h2 className='text-2xl font-bold mb-4'><u>Topic Catalogue</u></h2>
          <Accordion 
            data={accordionData} 
            onSelect={(item) => {
              fetchQuestions({
                year: item.year,
                topic: item.topic,
                subtopic: item.subtopic
              });
            }}
          />
        </div>

        <div className='flex-1 p-4'>
          <h1 className='text-2xl font-bold mb-4'>This is the current page for /Learn</h1>

          <div> {/** This will hold the search bar portion */}
            <SearchBar onSearch={(query) => fetchQuestions({ search: query })} />
          </div>

          <div className='portal-body'>
            <div className='results-area'>
              <div className='results-box'>
                <button 
                  className='absolute text-1xl top-2 right-4 p-1 hover cursor-pointer'
                  onClick={handleReset}
                  title='Clear Results :)'
                >
                  &times;
                </button>

                {questions && questions.length > 0 ? (
                  formatQuestions(questions) 
                ) : (
                  <p className='text-gray-400 flex justify-center'>
                    No results yet...😔
                  </p>
                )}
              </div>
              <p className='text-gray-400 flex justify-center'>
                  Not seeing the result you want?
              </p>
              <p className='text-gray-400 flex justify-center'>
                Talk to your teacher or double check the name you are searching for :D
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;