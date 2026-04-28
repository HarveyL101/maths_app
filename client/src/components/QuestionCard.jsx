import 'katex/dist/katex.min.css';
import { useState } from 'react';
import { BlockMath } from 'react-katex';
import { RESOLVER } from '../utils/questionResolver.js';

const QuestionCard = ({ question, answer, onAnswer }) => {
  if (!question) return null;

  const { question_type, question_input, question_answer, question_title } = question;

  // Interprets JSON inputs according to their question_type (maths logic)
  const resolver = RESOLVER[question_type];

  // Render the equation in appropriate Katex format (again depending on question_type)
  const stringAsKatex = resolver ? resolver.render(question_input) : null;

  // Checks against a DB-stored precomputed value
  const checkAnswer = (studentAnswer) => {
    if (!question_answer) return null;

    // Normalise simpler answer types (Reduce false negatives e.g. '  12' being incorrect)
    if (typeof question_answer === 'number' || typeof question_answer === 'string') {
      return String(studentAnswer).trim() === String(question_answer).trim();
    }

    // Normalise fractional answers (numerators + denominators)
    if (question_answer.numerator !== undefined) {
      const [studentNumerator, studentDenominator] = String(studentAnswer)
        .split('/')
        .map(s => s?.trim());

      return (
        parseInt(studentNumerator) === question_answer.numerator &&
        parseInt(studentDenominator) === question_answer.denominator
      );
    }

    // Normalising Division answers (quotients + remainders)
    if (question_answer.numerator !== undefined) {
      const [studentQuotient, studentRemainder] = String(studentAnswer).split('r').map(s => s?.trim());
      return (
        parseInt(studentQuotient) === question_answer.quotient &&
        parseInt(studentRemainder) === question_answer.remainder
      );
    }

    return null;
  };

  const isCorrect = answer !== undefined ? checkAnswer(answer) : null;

  // Infer placeholder hint based on answer shape
  const findPlaceholder = () => {
    if (!question_answer) return 'Your answer...';
    if (question_answer.numerator !== undefined) return 'e.g. 3/4';
    if (question_answer.quotient !== undefined) return 'e.g. 4r2';
    return 'Your answer...';
  };

  return (
    <div className="question-card">
      <p className="question-card-title">{question_title}</p>

      {/* KaTeX rendered question */}
      <div className="question-katex">
        {katexString ? (
          <BlockMath math={stringAsKatex} />
        ) : (
          <p className="question-katex-fallback">
            Unknown question type: {question_type}
          </p>
        )}
      </div>

      {/* Student answer input */}
      <div className="question-freetext">
        <input
          className={`question-freetext-input ${
            isCorrect === true  ? 'question-freetext-input--correct'   :
            isCorrect === false ? 'question-freetext-input--incorrect' : ''
          }`}
          type="text"
          placeholder={findPlaceholder()}
          value={answer ?? ''}
          onChange={(e) => onAnswer(e.target.value)}
        />
        {isCorrect === true  && <p className="question-feedback question-feedback--correct">Correct!</p>}
        {isCorrect === false && <p className="question-feedback question-feedback--incorrect">Not quite — keep trying</p>}
      </div>
    </div>
  );
};

export default QuestionCard;
