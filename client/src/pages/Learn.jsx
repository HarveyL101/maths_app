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
    return data.map((creator) => {
      const firstQuestion = creator.questions[0];

      return (
        <div
          key={creator.creator_id}
          className="creator-card"
        >
          {/* Body */}
          <div className="item-body">
            <p className="item-title">
              {firstQuestion.subtopic_name} by {firstQuestion.creator_surname}
            </p>
            <button className="item-button">
              ▸
            </button>
          </div>

          {/* Footer */}
          <div className="item-footer">
            <div className="item-year-group">
              Year {firstQuestion.year_group}
            </div>
            <div className="item-topic">
              {firstQuestion.topic_name}
            </div>
            <div className="item-subtopic">
              {firstQuestion.subtopic_name}
            </div>
          </div>
        </div>
      );
    })
  };
      

      // <CreatorCard key={creator.creator_id} creator={creator} />
      // <div key={creator.creator_id} className="creator-section mb-6">
        
      //   {/* Educator Header */}
      //   <h2 className="text-xl font-bold mb-4">
      //     {creator.questions[0].creator_surname}'s Questions
      //   </h2>

      //   {/* Questions listed under the educator */}
      //   {creator.questions.map((q) => (
      //     <div key={q.question_id} className='item-container mb-4'> 
      //       <div>
      //         <p className='question-id'>Question Id: {q.question_id}</p>
      //       </div>

      //       <div className='item-body'>
      //         <p className='item-title'>
      //           {q.subtopic_name} {/* no need to repeat "by X" */}
      //         </p>
      //         <button className='item-button'>▸</button>
      //       </div>

      //       <div className='item-footer'>
      //         <h3 className='item-year-group'>Year {q.year_group}</h3>
      //         <h3 className='item-topic'>{q.topic_name}</h3>
      //       </div>
      //     </div>
      //   ))}
      // </div>

  const CreatorCard = ({ creator }) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="creator-card rounded-lg shadow-md bg-white mb-4">
        {/* Header */}
        <button
          className="w-full flex justify-between items-center px-4 py-3 text-left font-bold hover:bg-gray-100 transition-colors"
          onClick={() => setOpen(!open)}
        >
          Educator {creator.questions[0].creator_surname}'s Questions
          <span>{open ? "▾" : "▸"}</span>
        </button>

        {/* Dropdown content */}
        {open && (
          <div className="px-4 py-2 border-t border-gray-200 space-y-2">
            {creator.questions.map((q) => (
              <div key={q.question_id} className="p-2 bg-violet-50 rounded flex justify-between items-center">
                <span className="font-medium">{q.subtopic_name}</span>
                <span className="text-sm text-gray-500">Year {q.year_group}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
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
          {/* <h1 className='text-2xl font-bold mb-4'>This is the current page for /Learn</h1> */}

          <div> {/** This will hold the search bar portion */}
            {/* <SearchBar onSearch={(query) => fetchQuestions({ search: query })} /> */}
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