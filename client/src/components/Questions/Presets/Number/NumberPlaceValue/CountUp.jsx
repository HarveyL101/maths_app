import 'katex/dist/katex.min.css';
import BaseQuestionForm from "../../../BaseQuestionForm";

const createKatex = (params) => {
  // Protects against crashing on load
  if (!params) return "";

  const numbers = Array.from({ length: 5}, (_, i) => {
    const entry = params[`num${i}`] || {};
    const value = entry.value ?? "?";     // default to ? if no value is present
    const hidden = entry.hidden ?? false; // default to false if hidden is undefined

    return hidden ? "\\_" : value;
  });

  // Check all visible numbers
  const visibleNumbers = numbers.filter((n) => n !== "\\_" && n !== "?");
  if (!visibleNumbers.every(n => /^\d+$/.test(n))) {
    return `
      \\begin{array}{c}
        \\text{Please enter positive whole numbers only}
      \\end{array}
    `;
  }

  return numbers.join(", \\; ");
}
const CountUp = ({ onSubmit }) => {
  return(
    <BaseQuestionForm
      title="Counting Up Template"
      createKatex={createKatex}
      questionType="number_count_up"
      fields={[
        { name: "num0", placeholder: "First Number", hasHidden: true },
        { name: "num1", placeholder: "Second Number", hasHidden: true },
        { name: "num2", placeholder: "Third Number", hasHidden: true },
        { name: "num3", placeholder: "Fourth Number", hasHidden: true },
        { name: "num4", placeholder: "Fifth Number", hasHidden: true },
      ]}
      onSubmit={onSubmit}
    />
  );
}

export default CountUp;