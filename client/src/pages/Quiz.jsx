import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TitleBar } from "../utils";
import { Footer } from "../utils";


const Quiz = () => {
  const { subtopicId } = useParams;
  const { state } = useLocation();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/questions/subtopic/${subtopicId}`);
        const data = await res.json();
        setQuestions(data);
      } catch(error) {
        console.log("Failed to fetch questions", error);
      } finally {
        setIsLoading(false)
      }
    };

    fetchQuestions();
  }, [subtopicId]);

  const handleAnswer = async (answer) => {
    setAnswers(prev => ({ ...prev, [currentIndex]: answer }));

    try {
      await fetch(`/api/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subtopicId,
          questionId: questions[currentIndex].question_id,
          answer,
        })
      });
    } catch(error) {
      console.error("Failed to save progress", error);
    }
  };

  const handleSubmit = async () => {
    // Post final score
    navigate(-1);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <TitleBar />

      <div className="quiz-page">

        <div className="quiz-header">
          <button
            className="quiz-back-btn"
            onClick={() => navigate(-1)}
          >
            {"<- Back"}
          </button>

          <div>
            <p className="quiz-title">{state?.subtopicName}</p>
            <div className="quiz-header-tags">
              <span className="creator-tag creator-tag--topic">
                Year {state?.year}
              </span>
              <span className="creator-tag creator-tag--topic">
                {state?.topic}
              </span>
            </div>
          </div>

          <div className="quiz-progress">
            {currentIndex + 1} / {questions.length}
          </div>
        </div>

        <div className="quiz-body">
          {isLoading ? (
            <p className="results-empty-msg">Loading questions...</p>
          ) : (
            <QuestionCard
              question={questions[currentIndex]}
              onAnswer={(answer) => {
                setAnswers(prev => ({
                  ...prev,
                  [currentIndex]: answer
                }));
              }}
            />
          )}
        </div>

        {/* Footer Section */}
        <div className="quiz-footer">
          <button
            className="quiz-nav-btn"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(i => i-1)}
          >
            {"<- Previous"}
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              className="quiz-nav-btn quiz-nav-btn--primary"
              onClick={() => setCurrentIndex(i => i+1)}
            >
              {"Next ->"}
            </button>
          ) : (
            <button
              className="quiz-nav-btn quiz-nav-btn--submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Quiz;