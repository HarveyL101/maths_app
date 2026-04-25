import TitleBar from '../components/TitleBar.jsx';
import SearchBar from '../components/SearchBar.jsx';
import Accordion from '../components/Accordion.jsx';
import { curriculum } from '../components/Questions/curriculumConfig.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer.jsx';


const Learn = () => {
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();

  const fetchQuestions = async (params) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`/api/questions?${query}`);
      const data = await res.json();
      setQuestions(data);

    } catch(error) {
      console.error("Failed to fetch questions", error);
    }
  };

  const formatQuestions = (data) => {
    return data.map((creator) => {
      const firstQuestion = creator.questions[0];

      console.log(firstQuestion);

      return (
        <div key={creator.creator_id} className="creator-card">
          {/* Body */}
          <div className="creator-card-body">
            <p className="creator-card-title">
              {firstQuestion.subtopic_name} 
            </p>
            <p className='creator-card-meta'>
              by {firstQuestion.creator_surname}
            </p>
          </div>

          {/* Footer */}
          <div className="creator-card-footer">
            <div className="creator-tag creator-tag--year">
              Year {firstQuestion.year_group}
            </div>
            <div className="creator-tag creator-tag--topic">
              {firstQuestion.topic_name}
            </div>
            <div className="creator-tag">
              {firstQuestion.subtopic_name}
            </div>
          </div>

          <button
            className='creator-card-btn'
            onClick={() => navigate(`/api/questions/${firstQuestion.subtopic_id}`, {
              state: {
                subtopicName: firstQuestion.subtopic_name,
                topic: firstQuestion.topic_name,
                year: firstQuestion.year_group,
                creatorSurname: firstQuestion.creator_surname,
              }
            })}
          >
            {"Start ->"}
          </button>
        </div>
      );
    })
  };
  
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
      
      <div className='flex flex-1'>

        <div className='sidebar'>
          <div className='sidebard-header-container'>
            <h2 className='sidebar-header'>Topic Catalogue</h2>
          </div>
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
          <div> {/** This will hold the search bar portion */}
            {/* <SearchBar onSearch={(query) => fetchQuestions({ search: query })} /> */}
          </div>

          <div className='portal-body'>
            <div className='results-area'>

              <div className='results-box'>
                <button 
                  className='results-clear-btn'
                  onClick={handleReset}
                  title='Clear Results :)'
                >
                  &times;
                </button>

                {questions && questions.length > 0 ? (
                  <div className='results-grid'>
                    {formatQuestions(questions)} 
                  </div>
                ) : (
                  <div className='results-empty'>
                    <p className='results-empty-msg'>No results yet...😔</p>
                    <p className='results-empty-sub'>Select a topic from the catalogue to see question sets.</p>
                  </div>
                )}
              </div>
              <p className='results-hint'>
                  Not seeing the result you want? Talk to your teacher or double check the name you are searching for :D
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Learn;