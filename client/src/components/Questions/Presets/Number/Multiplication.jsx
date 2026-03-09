import 'katex/dist/katex.min.css';
import BaseQuestionForm from '../../BaseQuestionForm';

const createKatex = (a, b) => {
    // protects against crashing on load
    if (!a || !b) return "";

    // Checks if either input does not contain only one or more digits
    if (!/^\d+$/.test(a) || !/^\d+$/.test(b)) {
      return `
      \\begin{array}{c}
      \\text{Please use positive whole numbers only}
      \\end{array}
      `;
    }

    const num1 = a.split("");
    const num2 = b.split("");

    console.log(num1, num2);

    const maxDigits = Math.max(num1.length, num2.length); // alows for dynamic inputs independant of length
    const timesDigits = (parseInt(a) * parseInt(b)).toString().split("");
    const totalCols = Math.max(maxDigits + 1, timesDigits.length); // extra column is for the relevant operator (x)

    // pads both numbers from the left to enforce H, T, U places
    const padded1 = Array(maxDigits - num1.length).fill("").concat(num1);
    const padded2 = Array(maxDigits - num2.length).fill("").concat(num2);

    // Row1 clears first column before the start of num1
    const row1 = Array(totalCols - (padded1.length + 1))
    .fill("")
    .concat("", ...padded1)
    .join(" & ");
    // Row2 preceds num2 with the relevant operator (x)
    // Need to double check whether an `x` or KaTeX's `\times` will render correctly here
    const row2 = Array(totalCols - (padded2.length + 1))
    .fill("")
    .concat("\\times", ...padded2)
    .join(" & ");
    // Answer = multiply the digits, and pad the left-most column for alignment
    const answer = Array(totalCols - timesDigits.length)
    .fill("")
    .concat(timesDigits)
    .join(" & ");

    const template = 
    `
    \\begin{array}{${"c".repeat(totalCols)}}
      ${row1} \\\\
      ${row2} \\\\
      \\hline
      ${answer}
    \\end{array}
    `;

    return template;
  }

const Multiplication = ({ onSubmit }) => {
  return (
    <BaseQuestionForm
      title="Multiplication Template"
      createKatex={createKatex}
      fields={[
        { name: "a", placeholder: "First Number" },
        { name: "b", placeholder: "Second Number" }
      ]}
      onSubmit={onSubmit}
    />
  );
}

export default Multiplication;