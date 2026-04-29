import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { checkAnswer, Footer, TitleBar, QuestionCard } from "../utils/index.js";

// Questions arrive to Quiz through the navigate() state, making fetches redundant.
export const Quiz = () => {
  const { subtopicId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const questions = state?.questions ?? [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (answer) => {
    setAnswers(prev => ({ ...prev, [currentIndex]: answer }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("jwt");

    const completions = questions.map((q, idx) => {
      const studentAnswer = answers[idx];
      const is_correct = checkAnswer(q.question_answer, studentAnswer);
      return { questionId: q.question_id, studentAnswer, is_correct };
    });

    console.log(completions);

    const finalScore = completions.filter(c => c.is_correct).length;
    setScore(finalScore);

    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subtopicId,
          completions
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error("Unable to save progress, please try again another time :(");

      alert(data.message);
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to save progress: ", error);
    }
  };

  // ***************************** RESULTS SCREEN *****************************
  if (submitted) {
    const total = questions.length;
    const percentageCorrect = Math.round((score / total) * 100);
    
    return (
      <div className="page-wrapper">
        <TitleBar />
        <div className="quiz-page">
          <h2 className="quiz-results-title">You have completed the quiz!</h2>
          <p className="quiz-results-sub">{state?.subtopicName}</p>

          <div className="quiz-results-stat">
            <span className="quiz-results-count">{score}</span>
            <span className="quiz-results-denom"> / {total}</span>
            <p className="quiz-results-label">{percentageCorrect}% correct</p>
          </div>

          <div className="quiz-results-actions">
            <button className="quiz-nav-button quiz-nav-button--primary"
              onClick={() => navigate('/learn')}>
              Back To Learn
            </button>
            <button className="quiz-nav-button"
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
                setScore(0);
              }}
            >
              Retry Quiz
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ***************************** Protection against an empty pool *****************************
  if (questions.length === 0) {
    return (
      <div className="page-wrapper">
        <TitleBar />
        <div className="quiz-page">
          <div className="results-empty">
            <p className="results-empty-message">No questions found.</p>
            <button className="quiz-nav-button" onClick={() => navigate('/learn')}>
              Back To Learn
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ***************************** Main Quiz Page *****************************
  return (
    <div className="page-wrapper">
      <TitleBar />

      <div className="quiz-page">
        {/* Header Space */}
        <div className="quiz-header">
          <button className="quiz-back-button" onClick={() => navigate('/learn')}>
            {"<- Back"}
          </button>

          <div>
            <p className="quiz-title">{state?.subtopicName}</p>
            <div className="quiz-header-tags">
              <span className="creator-tag creator-tag--topic">Year {state?.year}</span>
              <span className="creator-tag creator-tag--topic">{state?.topic}</span>
            </div>
          </div>
          <div className="quiz-progress">{currentIndex + 1} / {questions.length}</div>
        </div>

        {/* Progress Bar */}
        <div className="quiz-progress-bar-track">
          <div className="quiz-progress-bar-fill"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%`}}>
          </div>
        </div>

        {/* Question Card */}
        <div className="quiz-body">
          <QuestionCard
            question={questions[currentIndex]}
            answer={answers[currentIndex]}
            onAnswer={handleAnswer}
          />
        </div>

        {/* Navigation Section Section */}
        <div className="quiz-footer">
          <button className="quiz-nav-button" disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(i => i - 1)}>
            {"<- Previous"}
          </button>
          {currentIndex < questions.length - 1 ? (
            <button className="quiz-nav-button quiz-nav-button--primary"
              onClick={() => setCurrentIndex(i => i + 1)}>
              {"Next ->"}
            </button>
          ) : (
            <button className="quiz-nav-button quiz-nav-button--submit" onClick={handleSubmit}>
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