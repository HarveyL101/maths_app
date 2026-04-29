import { Accordion, Footer, SearchBar, TitleBar } from '../utils/index.js';
import { curriculum } from '../components/Questions/curriculumConfig.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Max Quiz size variable
const MAX_QUIZ_SIZE = 10;

const Learn = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState('');
  const navigate = useNavigate();

  const fetchQuestions = async (params) => {
    try {
      const query = new URLSearchParams(params).toString();
      const token = localStorage.getItem("jwt");

      const res = await fetch(`/api/questions?${query}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      setQuestions(data);
    } catch(error) {
      console.error("Failed to fetch questions", error);
    }
  };

  const createQuestionPool = (data) => {
    const map = {};

    // Groups the flat array into pools by their subtopic_id.
    data.forEach((q) => {
      if (!map[q.subtopic_id]) {
        map[q.subtopic_id] = {
          subtopic_id: q.subtopic_id,
          subtopic_name: q.subtopic_name,
          topic_name: q.topic_name,
          year_group: q.year_group,
          creator_surname: q.creator_surname,
          questions: [],
        };
      }
      map[q.subtopic_id].questions.push(q);
    });
    return Object.values(map);
  };

  const startQuizHandler = (poolEntry) => {
    const { questions, subtopic_id, subtopic_name, topic_name, year_group, creator_surname } = poolEntry;

    // Shuffle question pool for randomness
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    // Slice a portion of questions off from the main pool
    const slice = shuffled.slice(0, MAX_QUIZ_SIZE);

    // Move data and user into the Quiz screen to complete questions
    navigate(`/quiz/${subtopic_id}`, {
      state: {
        questions: slice,
        subtopicName: subtopic_name,
        topic: topic_name,
        year: year_group,
        creatorSurname: creator_surname,
      }
    });
  };

  const formatQuestionPools = (pools) => {
    return pools.map((pool) => {
      const questionCount = Math.min(pool.questions.length, MAX_QUIZ_SIZE);
      const hasEnough = pool.questions.length >= MAX_QUIZ_SIZE;

      return (
        <div key={pool.subtopic_id} className='creator-card'>
          <div className='creator-card-body'>
            <p className='creator-card-title'>{pool.subtopic_name}</p>
            <p className='creator-card-meta'>{pool.creator_surname}</p>
            <p className='question-count'>
              {pool.questions.length} question{pool.questions.length !== 1 ? 's' : ''} available
            </p>
          </div>

          <div className='creator-card-footer'>
            <div className='creator-tag creator-tag--year'>Year {pool.year_group}</div>
            <div className='creator-tag creator-tag--topic'>{pool.topic_name}</div>
            <div className='creator-tag'>{pool.subtopic_name}</div>
          </div>
          {/* Need to double check the startQuizHandler prop being passed */}
          <button 
            className='creator-card-button' 
            onClick={() => startQuizHandler(pool)}
          >
            {hasEnough
              ? `Start Quiz (${questionCount} Qs) ->`
              : `Start Quiz (${questionCount} available) ->`}
          </button>
        </div>
      );
    });
  };
  
  const buildAccordionData = (curriculum) => {
    return Object.entries(curriculum).map(([year, topics]) => ({
      title: `Year ${year}`,
      children: Object.entries(topics).map(([topic, subtopics]) => ({
        title: topic,
        children: subtopics.map((subtopic) => ({
          title: subtopic,
          year, topic, subtopic
        }))
      }))
    }));
  };

  const accordionData = buildAccordionData(curriculum);
  const pools = createQuestionPool(questions);

  const handleReset = () => {
    setQuestions([]);
    setSelectedLabel('');
  };

  return (
    <div className='page-wrapper'>
      <TitleBar />
      
      <div className='flex flex-1'>
        <div className='sidebar'>
          <div className='sidebar-header-container'>
            <h2 className='sidebar-header'>Topic Catalogue</h2>
          </div>

          <Accordion 
            data={accordionData} 
            onSelect={(item) => fetchQuestions({
              year: item.year,
              topic: item.topic,
              subtopic: item.subtopic
            })}
          />

        </div>

        <div className='flex-1 p-4'>
          <div> {/** This will hold the search bar portion */}
            {/* <SearchBar onSearch={(query) => fetchQuestions({ search: query })} /> */}
          </div>

          <div className='portal-body'>
            <div className='results-area'>

              <div className='results-box'>
                <button  className='results-clear-btn' onClick={handleReset} title='Clear Results :)'>
                  &times;
                </button>

                {questions.length > 0 ? (
                  <>
                    <div className='results-header'>
                      <p className='results-label'>{selectedLabel}</p>
                      <p className='results-sub'>
                        {pools.length} set{pools.length !== 1 ? 's' : ''} found -
                        quizzes are {MAX_QUIZ_SIZE} questions drawn randomly from the pool
                      </p>
                    </div>
                    <div className='results-grid'>{formatQuestionPools(pools)}</div>
                  </>
                ) : (
                  <div className='results-empty'>
                    <p className='results-empty-msg'>No results yet...😔</p>
                    <p className='results-empty-sub'>
                      Select a topic from the catalogue to see question sets.
                    </p>
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