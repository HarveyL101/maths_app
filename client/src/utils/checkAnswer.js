// Checks a student's answer against a DB-stored precomputed value,
// keyed by question_type to match the RESOLVER/QUESTION_RENDERER pattern.

const ANSWER_CHECKERS = {

  number_addition: (question_answer, studentAnswer) =>
    String(studentAnswer).trim() === String(question_answer).trim(),

  number_subtraction: (question_answer, studentAnswer) =>
    String(studentAnswer).trim() === String(question_answer).trim(),

  number_multiplication: (question_answer, studentAnswer) =>
    String(studentAnswer).trim() === String(question_answer).trim(),

  number_division: (question_answer, studentAnswer) => {
    const [studentQuotient, studentRemainder] = String(studentAnswer).split('r').map(s => s?.trim());
    const quotientMatch  = parseInt(studentQuotient) === question_answer.quotient;
    const remainderMatch = question_answer.remainder === 0
      ? !studentRemainder
      : parseInt(studentRemainder) === question_answer.remainder;
    return quotientMatch && remainderMatch;
  },

  fraction_addition: (question_answer, studentAnswer) => {
    const [studentNumerator, studentDenominator] = String(studentAnswer).split('/').map(s => s?.trim());
    return (
      parseInt(studentNumerator)   === question_answer.numerator &&
      parseInt(studentDenominator) === question_answer.denominator
    );
  },

  fraction_subtraction: (question_answer, studentAnswer) => {
    const [studentNumerator, studentDenominator] = String(studentAnswer).split('/').map(s => s?.trim());
    return (
      parseInt(studentNumerator)   === question_answer.numerator &&
      parseInt(studentDenominator) === question_answer.denominator
    );
  },

  fraction_multiplication: (question_answer, studentAnswer) => {
    const [studentNumerator, studentDenominator] = String(studentAnswer).split('/').map(s => s?.trim());
    return (
      parseInt(studentNumerator)   === question_answer.numerator &&
      parseInt(studentDenominator) === question_answer.denominator
    );
  },

  fraction_division: (question_answer, studentAnswer) => {
    const [studentNumerator, studentDenominator] = String(studentAnswer).split('/').map(s => s?.trim());
    return (
      parseInt(studentNumerator)   === question_answer.numerator &&
      parseInt(studentDenominator) === question_answer.denominator
    );
  },

  fraction_count_up: (question_answer, studentAnswer) => {
    const [studentNumerator, studentDenominator] = String(studentAnswer).split('/').map(s => s?.trim());
    const lastStep = question_answer.sequence?.[question_answer.sequence.length - 1];
    return (
      parseInt(studentNumerator)   === lastStep?.numerator &&
      parseInt(studentDenominator) === lastStep?.denominator
    );
  },

  fraction_decimals: (question_answer, studentAnswer) =>
    parseFloat(studentAnswer) === question_answer.decimal,

  fraction_decimals_percentages: (question_answer, studentAnswer) =>
    parseFloat(studentAnswer) === question_answer.decimal,

  algebra_missing_number: (question_answer, studentAnswer) =>
    String(studentAnswer).trim() === String(question_answer.answer).trim(),

};

export const checkAnswer = (question_type, question_answer, studentAnswer) => {
  if (!question_answer || studentAnswer === undefined || studentAnswer === '') return null;

  const checker = ANSWER_CHECKERS[question_type];
  if (!checker) {
    console.warn(`checkAnswer: no checker found for question_type "${question_type}"`);
    return null;
  }

  return checker(question_answer, studentAnswer);
};

export default checkAnswer;