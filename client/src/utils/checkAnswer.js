// Checks against a DB-stored precomputed value
export const checkAnswer = (question_answer, studentAnswer) => {
  if (!question_answer || studentAnswer === undefined || studentAnswer === '') return null;

  // Algebra Handling: { answer, missingField }
  if (question_answer.answer !== undefined) {
    return String(studentAnswer).trim() === String(question_answer.answer).trim();
  }

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

export default checkAnswer;
