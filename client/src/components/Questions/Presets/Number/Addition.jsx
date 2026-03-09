import 'katex/dist/katex.min.css';
import BaseQuestionForm from "../../BaseQuestionForm.jsx";

const createKatex = ({ a, b }) => {

    // Protects against crashing on load
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

    const maxDigits = Math.max(num1.length, num2.length); // allows for dynamic inputs independant of length
    const totalCols = maxDigits + 1; // extra column for  the operator (+)

    // Pads both numbers from the left to enforce H, T, U places
    const padded1 = Array(maxDigits - num1.length).fill("").concat(num1);
    const padded2 = Array(maxDigits - num2.length).fill("").concat(num2);

    // Row 1: clears first column before num1 starts
    const row1 = ["", ...padded1].join(" & ");

    // Row 2: + in the first column before num2 starts
    const row2 = ["+"].concat(padded2).join(" & ");

    // Answer = sum the digits, and pad the left-most column for alignment
    const sumDigits = (parseInt(a) + parseInt(b))
      .toString()
      .split("");
    const answer = Array(totalCols - sumDigits.length).fill("").concat(sumDigits).join(" & ");


    return `
      \\begin{array}{${"c".repeat(totalCols)}}
        ${row1} \\\\
        ${row2} \\\\
        \\hline
        ${answer}
      \\end{array}
    `;
  }

const Addition = ({ onSubmit }) => {
  return (
    <BaseQuestionForm
      title="Addition Template"
      createKatex={createKatex}
      fields={[
        { name: "a", placeholder: "First Number" },
        { name: "b", placeholder: "Second Number" }
      ]}
      onSubmit={onSubmit}
    />
  );
};

export default Addition;