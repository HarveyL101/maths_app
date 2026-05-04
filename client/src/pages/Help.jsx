import { Footer, TitleBar } from "../utils/index";

const Help = () => {
  return (
    <div className="page-wrapper">
      <TitleBar/>
      
      <div className="help-page">
        {/* Header Portion */}
        <div className="help-header">
          <h1 className="help-title">Tips & Help</h1>
          <p className="help-subtitle">
            Frequently asked questions and learning guidance
          </p>
        </div>

        <div className="help-faq">
          <div className="faq-card">
            <button className="faq-question">
              How do I start a quiz?
            </button>
            <p className="faq-answer">
              Go to the Learn page, select a topic from the catalogue, 
              and click "Start Quiz" on any available question set.
            </p>
          </div>

          <div className="faq-card">
            <button className="faq-question">Why can't I see enough questions in a quiz?</button>
            <p className="faq-answer">
              Some topics may not have enough questions to fill a full quiz. You
              can still attempt them, the system will just use however many are available.
            </p>
          </div>

          <div className="faq-card">
            <button className="faq-question">How is my progress saved?</button>
            <p className="faq-answer">
              Your results are automatically stored when you submit a quiz and are
              tracked per question in your progress history.
            </p>
          </div>

          <div className="faq-card">
            <button className="faq-question">What should I do if I get stuck on a question?</button>
            <p className="faq-answer">
              Try reviewing earlier topics or using hints where available. You can
              also revisit completed quizzes to learn from mistakes.
            </p>
          </div>

          <div className="faq-card">
            <button className="faq-question">How do I access teacher tools?</button>
            <p className="faq-answer">
              If your account is assigned the educator role, you will see a Teacher
              Portal option in the navigation bar.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Help;