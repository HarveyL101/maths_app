import { useNavigate } from "react-router-dom";
import { Footer, TitleBar } from "../utils";

const TeacherPortal = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <TitleBar />

      <div className="tp-container">
        <div className="tp-header">
          <h1 className="tp-title">Teacher Portal</h1>
          <p className="tp-subtitle">Manage your questions and quizzes</p>
        </div>

        <div className="tp-grid">
          <button className="tp-card" onClick={() => navigate('/view-questions')}>
            <h2 className="tp-card-title">My Questions</h2>
            <p className="tp-card-subtitle">Edit/ Delete Existing Questions</p>
          </button>

          <button className="tp-card" onClick={() => navigate('/question-portal')}>
            <h2 className="tp-card-title">Create Quiz</h2>
            <p className="tp-card-subtitle">Select and Create New Questions From Existing Presets</p>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default TeacherPortal;